import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ResearcherDashboard from './ResearcherDashboard';
import AdminDashboard from './AdminDashboard';
import FunderDashboard from './FunderDashboard';
import ManageProfile from './ManageProfile';
import SubmitProposal from './SubmitProposal';
import ViewProposals from './ViewProposals';
import Chat from './Chat';
import Forums from './Forums';
import ManageUsers from './ManageUsers';
import ManageGrants from './ManageGrants';
import ReviewProposals from './ReviewProposals';
import ManageEvents from './ManageEvents';
import CollaborationTools from './CollaborationTools';
import ManageNews from './ManageNews';
import ManageSupport from './ManageSupport';
import FileSharing from './FileSharing';
import SearchEvents from './SearchEvents';

export const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Grant access to all routes for any logged-in user
  return (
    <Routes>
          <Route path="/help" element={<Help />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/researcher" element={<ResearcherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/funder" element={<FunderDashboard />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/submit-proposal" element={<SubmitProposal />} />
          <Route path="/view-proposals" element={<ViewProposals />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/file-sharing" element={<FileSharing />} />
          <Route path="/events" element={<ManageEvents />} />
          <Route path="/manage-grants" element={<ManageGrants />} />
          <Route path="/grants" element={<SearchGrants />} />
          <Route path="/register-events" element={<SearchEvents />} />
          <Route path="/review-proposals" element={<ReviewProposals />} />
          <Route path="/collab-tools" element={<CollaborationTools />} />
          <Route path="/profile1" element={<ManageProfile />} />
          <Route path="/manage-news" element={<ManageNews />} />
          <Route path="/manage-support" element={<ManageSupport />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/discussion-forums" element={<DiscussionForums />} />
      
    </Routes>
  );
};