import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';

const FullscreenView = () => {
  const { campaignId } = useParams();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/campaigns/${campaignId}/likes`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLikes(response.data.likes);
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
        toast.error('Failed to fetch likes');
      }
    };

    fetchLikes();
  }, [campaignId, token]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/campaigns/${campaignId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLikes(response.data.likes);
      setIsLiked(true);
      toast.success('Liked!');
    } catch (error) {
      console.error('Error liking campaign:', error);
      toast.error('Failed to like campaign');
    }
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className="transform transition-transform hover:scale-125"
          >
            <AiFillHeart
              className={`text-3xl ${isLiked ? 'text-red-500' : 'text-white'}`}
            />
          </button>
          <span className="text-white text-lg font-bold">{likes}</span>
        </div>
        <button
          onClick={handleClose}
          className="text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30"
        >
          Close
        </button>
      </div>
      <img
        src={`${API_BASE_URL}/campaigns/${campaignId}/image`}
        alt="Campaign"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default FullscreenView;