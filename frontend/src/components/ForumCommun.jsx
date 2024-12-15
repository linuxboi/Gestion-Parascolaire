import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThumbsUp, ThumbsDown, MessageSquareText } from 'lucide-react'; // Import necessary icons

const ImageGrid = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [newComment, setNewComment] = useState(''); // État pour le texte du nouveau commentaire
  const token = localStorage.getItem('token'); 

  if (!token) {
    setError('Utilisateur non authentifié.');
    return null; // Retourner null si l'utilisateur n'est pas authentifié
  }

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/publications', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        });
        setPublications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [token]);

  const handleReact = async (publicationId, type) => {
    const existingReactionIndex = publications.find(pub => pub._id === publicationId).reactions.findIndex(r => r.type === type);

    try {
      if (existingReactionIndex !== -1) {
        // Si la réaction existe déjà, on la retire
        await axios.delete(`http://localhost:4000/api/publications/${publicationId}/react`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
          data: { type }, // Passer le type de réaction à supprimer
        });
        
        console.log(`Removed ${type} from publication`);
      } else {
        // Sinon, on ajoute la nouvelle réaction
        await axios.post(`http://localhost:4000/api/publications/${publicationId}/react`, { type }, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        });
        
        console.log(`Added ${type} to publication`);
      }

      // Mettre à jour l'état local
      setPublications((prevPublications) =>
        prevPublications.map((pub) => {
          if (pub._id === publicationId) {
            if (existingReactionIndex !== -1) {
              // Retirer la réaction
              return {
                ...pub,
                reactions: pub.reactions.filter(r => r.type !== type),
              };
            } else {
              // Ajouter la nouvelle réaction
              return {
                ...pub,
                reactions: [...pub.reactions, { type }],
              };
            }
          }
          return pub;
        })
      );
    } catch (err) {
      console.error(`Error handling ${type}:`, err);
    }
  };

  const handleCommentClick = (publication) => {
    setSelectedPublication(publication);
    setModalOpen(true);
    setNewComment(''); // Réinitialiser le champ de texte lorsque le modal s'ouvre
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPublication(null);
  };

  const handleAddComment = async () => {
    if (newComment && selectedPublication) {
      try {
        await axios.post(`http://localhost:4000/api/publications/${selectedPublication._id}/comments`, { texte: newComment }, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        });
        
        console.log('Comment added');
        
        // Mettre à jour l'état local après ajout du commentaire
        setPublications((prevPublications) =>
          prevPublications.map((pub) => {
            if (pub._id === selectedPublication._id) {
              return { 
                ...pub, 
                commentaires: [...pub.commentaires, { texte: newComment }] 
              }; // Ajouter le nouveau commentaire au tableau
            }
            return pub;
          })
        );

        // Mettre à jour également selectedPublication pour afficher le nouveau commentaire dans le modal
        setSelectedPublication(prev => ({
          ...prev,
          commentaires: [...prev.commentaires, { texte: newComment }] // Ajouter le commentaire au modal
        }));

        setNewComment(''); // Réinitialiser le champ de texte après ajout
      } catch (err) {
        console.error('Error adding comment:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 mt-16">
      <div className="grid grid-cols-3 gap-4 p-16">
        {publications.map((publication) => (
          <div key={publication._id} className="relative bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              src={`${publication.contenu}`}
              alt={publication.sujet}
              className="w-full h-72 object-cover object-top"
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2 bg-white bg-opacity-90">
              <div className="flex items-center mx-auto space-x-24">
                <button 
                  onClick={() => handleReact(publication._id, 'like')} 
                  className={`flex items-center ${publication.reactions.some(r => r.type === 'like') ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
                >
                  <span className="text-xs mr-1">{publication.reactions.filter(r => r.type === 'like').length}</span>
                  <ThumbsUp size={20} />
                </button>
                <button 
                  onClick={() => handleReact(publication._id, 'dislike')} 
                  className={`flex items-center ${publication.reactions.some(r => r.type === 'dislike') ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`}
                >
                  <span className="text-xs mr-1">{publication.reactions.filter(r => r.type === 'dislike').length}</span>
                  <ThumbsDown size={20} />
                </button>
                <button onClick={() => handleCommentClick(publication)} className="flex items-center text-gray-600 hover:text-green-500">
                  <span className="text-xs mr-1">{publication.commentaires.length}</span>
                  <MessageSquareText size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour les commentaires */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl flex relative">
            {/* Colonne de gauche : Publication */}
            <div className="w-1/2 pr-4">
              <h2 className="text-lg font-bold mb-2">{selectedPublication.sujet}</h2>
              <img src={`${selectedPublication.contenu}`} alt={selectedPublication.sujet} className="w-full h-auto mb-4" />
            </div>
            
            {/* Colonne de droite : Commentaires */}
            <div className="w-1/2 pl-4">
              <h3 className="font-semibold mb-2">Commentaires:</h3>
              <ul className="mb-4">
                {selectedPublication.commentaires.map((commentaire, index) => (
                  <li key={index} className="border-b py-2">{commentaire.texte}</li>
                ))}
              </ul>
              <textarea 
                placeholder="Ajouter un commentaire..."
                rows="3"
                value={newComment} // Lier l'état du champ de texte
                onChange={(e) => setNewComment(e.target.value)} // Mettre à jour l'état lors de la saisie
                className="w-full border rounded p-2 mb-2"
              />
              {/* Bouton Publier */}
              <button onClick={handleAddComment} className="bg-green-500 text-white font-semibold rounded px-4 py-2">Comment</button>
            </div>

            {/* Bouton pour fermer le modal */}
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-red-500 text-xl">X</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
