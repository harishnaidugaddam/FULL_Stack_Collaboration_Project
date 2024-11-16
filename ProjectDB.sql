-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 16, 2024 at 10:18 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ProjectDB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Applications`
--

CREATE TABLE `Applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `grant_id` int(11) NOT NULL,
  `status` enum('Pending','Ongoing','Approved','Rejected') DEFAULT 'Pending',
  `applied_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Applications`
--

INSERT INTO `Applications` (`id`, `user_id`, `grant_id`, `status`, `applied_date`) VALUES
(1, 5, 4, 'Pending', '2024-11-13 02:52:32'),
(2, 1, 4, 'Approved', '2024-11-16 05:24:10'),
(3, 1, 3, 'Rejected', '2024-11-16 05:25:03'),
(4, 1, 1, 'Rejected', '2024-11-16 05:25:03');

-- --------------------------------------------------------

--
-- Table structure for table `ContactSupport`
--

CREATE TABLE `ContactSupport` (
  `support_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `status` enum('Pending','Answered') DEFAULT 'Pending',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ContactSupport`
--

INSERT INTO `ContactSupport` (`support_id`, `user_id`, `name`, `email`, `question`, `status`, `timestamp`) VALUES
(1, 1, 'Alice', 'alice@example.com', 'How do I reset my password?', 'Answered', '2024-11-13 02:49:45'),
(2, 2, 'Bob', 'bob@example.com', 'How do I track my application?', 'Answered', '2024-11-13 02:49:45'),
(3, 3, 'Charlie', 'charlie@example.com', 'Can I withdraw my application?', 'Answered', '2024-11-13 02:49:45'),
(4, 4, 'Daisy', 'daisy@example.com', 'How can I join an event?', 'Pending', '2024-11-13 02:49:45'),
(5, 5, 'Ethan', 'ethan@example.com', 'Is there a fee to register?', 'Answered', '2024-11-13 02:49:45'),
(6, 6, 'Fiona', 'fiona@example.com', 'How do I find available grants?', 'Pending', '2024-11-13 02:49:45'),
(7, 7, 'George', 'george@example.com', 'What is the eligibility for grants?', 'Answered', '2024-11-13 02:49:45'),
(8, 8, 'Hannah', 'hannah@example.com', 'Can I change my email address?', 'Pending', '2024-11-13 02:49:45'),
(9, 9, 'Ian', 'ian@example.com', 'What happens if my application is rejected?', 'Answered', '2024-11-13 02:49:45'),
(10, 10, 'Jack', 'jack@example.com', 'How can I contact support?', 'Pending', '2024-11-13 02:49:45'),
(11, NULL, 're', 'rer@gmail.com', 'ere', 'Answered', '2024-11-16 18:12:01'),
(12, NULL, 'AI in ISRO', 'user1@gmail.com', '123456', 'Pending', '2024-11-16 18:25:57'),
(13, NULL, 'funder', 'funder@gmail.com', '123456', 'Pending', '2024-11-16 18:26:55'),
(14, 3, 'Siva', 'admin@gmail.com', 'uytyuik', 'Pending', '2024-11-16 19:07:21'),
(15, 1, 'AI in ISRO', 'user1@gmail.com', '1234567890', 'Answered', '2024-11-16 19:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `Event_id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Start_date` date DEFAULT NULL,
  `End_date` date DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Organiser` varchar(100) DEFAULT NULL,
  `Max_participants` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`Event_id`, `Title`, `Description`, `Start_date`, `End_date`, `Location`, `Organiser`, `Max_participants`) VALUES
(1, 'AI Summit', 'Annual summit on AI advancements', '2024-12-01', '2024-12-03', 'New York', 'TechCorp', 500),
(2, 'Data Science Expo', 'Exposition of data science projects', '2024-11-10', '2024-11-12', 'San Francisco', 'DataWorld', 300),
(3, 'Innovation Fest', 'Celebrating innovation in technology', '2024-10-05', '2024-10-07', 'Austin', 'InnovateNow', 1000),
(4, 'Healthcare Tech Forum', 'Forum on healthcare technology', '2024-09-15', '2024-09-17', 'Chicago', 'HealthFirst', 200),
(5, 'Education and Tech', 'Conference on education technologies', '2024-08-20', '2024-08-22', 'Boston', 'EdTech', 150),
(6, 'Startup Weekend', 'Networking event for startups', '2024-07-18', '2024-07-20', 'Seattle', 'Startup Hub', 100),
(7, 'Blockchain Symposium', 'Exploring blockchain technology', '2024-06-10', '2024-06-12', 'Los Angeles', 'CryptoWorld', 400),
(8, 'Climate Action Conference', 'Conference on climate change solutions', '2024-05-08', '2024-05-10', 'Miami', 'GreenPlanet', 250),
(9, 'Renewable Energy Expo', 'Exposition of renewable energy tech', '2024-04-05', '2024-04-07', 'Denver', 'EcoFuture', 350),
(10, 'Tech Innovations', 'Presenting the latest tech innovations', '2024-03-15', '2024-03-17', 'Silicon Valley', 'TechNext', 600),
(11, '121', '1212', '2024-11-16', '2024-11-16', 'Dallas', 'UTA', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `Grants`
--

CREATE TABLE `Grants` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `funder` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `deadline` date DEFAULT NULL,
  `eligibility` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Grants`
--

INSERT INTO `Grants` (`id`, `title`, `description`, `funder`, `amount`, `deadline`, `eligibility`) VALUES
(1, 'AI Research Grant', 'Funding for AI projects', 'AI Foundation', 10000.00, '2024-12-31', 'AI projects only'),
(2, 'Healthcare Solutions Grant', 'Grant for healthcare tech', 'HealthFund', 15000.00, '2024-11-30', 'Healthcare-focused projects'),
(3, 'Renewable Energy Grant', 'Funding for renewable energy projects', 'EcoGrant', 12000.00, '2024-10-15', 'Renewable energy focus'),
(4, 'Educational Tools Grant', 'Grant for educational tools and resources', 'EduFund', 8000.00, '2024-09-20', 'Education-focused projects');

-- --------------------------------------------------------

--
-- Table structure for table `HelpSupport`
--

CREATE TABLE `HelpSupport` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text DEFAULT NULL,
  `answered` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `HelpSupport`
--

INSERT INTO `HelpSupport` (`id`, `question`, `answer`, `answered`, `created_at`, `updated_at`) VALUES
(1, 'How to reset my password?', 'Use the \"Forgot Password\" link on the login page.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(2, 'Can I delete my account?', 'Contact support to assist with account deletion.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(3, 'How do I register for an event?', 'Visit the events page and click \"Register\" on the desired event.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(4, 'What is the eligibility for grants?', 'Eligibility details are listed in each grant description.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(5, 'How to contact support?', 'You can contact support via email or the contact page.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(6, 'How to apply for a grant?', 'Go to grants page and click on the desired grant to apply.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(7, 'Can I apply for multiple grants?', 'Yes, you can apply for multiple grants.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(8, 'How to update my profile information?', 'Visit profile settings to update your details.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(9, 'Can I change my email?', 'Contact support to update your registered email.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(10, 'Is there a fee to register for events?', 'Most events are free. Check event details for any fees.', 1, '2024-11-13 02:49:55', '2024-11-13 02:49:55'),
(11, 'How do I track my application?', 'Please check the status', 1, '2024-11-16 05:35:26', '2024-11-16 05:35:26'),
(12, 'ere', 'NA', 1, '2024-11-16 18:29:14', '2024-11-16 18:29:14'),
(13, '1234567890', '1234567890', 1, '2024-11-16 19:09:40', '2024-11-16 19:09:40');

-- --------------------------------------------------------

--
-- Table structure for table `Profile`
--

CREATE TABLE `Profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `position` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `research_interests` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Profile`
--

INSERT INTO `Profile` (`id`, `user_id`, `position`, `department`, `research_interests`) VALUES
(1, 1, 'Data Scientist', 'Research', 'Machine Learning, AI'),
(2, 2, 'Software Engineer', 'Development', 'Web Development, Databases'),
(3, 3, 'Project Manager', 'Management', 'Agile methodologies, Team leadership'),
(4, 4, 'Data Analyst', 'Data Science', 'Data Visualization, Predictive Analytics'),
(5, 5, 'Research Assistant', 'AI Lab', 'Natural Language Processing'),
(6, 6, 'Business Analyst', 'Finance', 'Financial Modeling, Forecasting'),
(7, 7, 'Backend Developer', 'IT', 'Database Optimization, APIs'),
(8, 8, 'Frontend Developer', 'UI/UX', 'Design Systems, User Experience'),
(9, 9, 'System Administrator', 'IT', 'Network Security, System Maintenance');

-- --------------------------------------------------------

--
-- Table structure for table `Proposals`
--

CREATE TABLE `Proposals` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `file` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Pending','Accepted','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Proposals`
--

INSERT INTO `Proposals` (`id`, `title`, `description`, `file`, `amount`, `created_at`, `status`) VALUES
(1, 'AI for Healthcare', 'Proposal for AI implementation in healthcare', '/uploads/ai_healthcare.pdf', 15000.00, '2024-11-13 02:50:25', 'Pending'),
(2, 'Renewable Energy Initiative', 'Proposal for renewable energy research', '/uploads/renewable_energy.pdf', 20000.00, '2024-11-13 02:50:25', 'Accepted'),
(3, 'Data Science in Education', 'Proposal for using data science in education', '/uploads/data_science_edu.pdf', 18000.00, '2024-11-13 02:50:25', 'Rejected'),
(4, 'Tech Innovation for Social Impact', 'Social impact through technology', '/uploads/tech_social_impact.pdf', 12000.00, '2024-11-13 02:50:25', 'Pending'),
(5, 'Blockchain in Finance', 'Proposal for blockchain in finance', '/uploads/blockchain_finance.pdf', 25000.00, '2024-11-13 02:50:25', 'Accepted'),
(6, 'Climate Action Using AI', 'Proposal for climate solutions with AI', '/uploads/ai_climate_action.pdf', 10000.00, '2024-11-13 02:50:25', 'Pending'),
(7, 'Education for Rural Areas', 'Proposal to improve rural education', '/uploads/edu_rural_areas.pdf', 13000.00, '2024-11-13 02:50:25', 'Accepted'),
(8, 'Healthcare Data Management', 'Proposal to manage healthcare data', '/uploads/healthcare_data.pdf', 11000.00, '2024-11-13 02:50:25', 'Rejected'),
(9, 'AI for Smart Cities', 'Proposal for AI-powered smart cities', '/uploads/ai_smart_cities.pdf', 22000.00, '2024-11-13 02:50:25', 'Pending'),
(10, 'Tech for Sustainability', 'Proposal for sustainable technology', '/uploads/tech_sustainability.pdf', 24000.00, '2024-11-13 02:50:25', 'Accepted'),
(11, 'ewww', 'ewe', '/Applications/XAMPP/xamppfiles/htdocs/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/uploads/67382bf95f64e-ATS_Compliant_Technologies_Skills_Table_Side_By_Side.xlsx', 1212.00, '2024-11-16 05:22:01', 'Rejected'),
(12, 'Proposal1', '12345', '/Applications/XAMPP/xamppfiles/htdocs/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/uploads/67382c1e1a222-ATS_Compliant_Technologies_Skills_Table_Side_By_Side.xlsx', 1.00, '2024-11-16 05:22:38', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `RecentNews`
--

CREATE TABLE `RecentNews` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `uploaded_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RecentNews`
--

INSERT INTO `RecentNews` (`id`, `title`, `content`, `uploaded_date`) VALUES
(1, 'New AI Grant Released', 'AI Foundation announces new grant for AI research.', '2024-11-13 02:50:25'),
(2, 'Tech Conference Next Month', 'Join the annual tech conference in New York.', '2024-11-13 02:50:25'),
(3, 'Climate Action Initiatives', 'Funding available for climate action projects.', '2024-11-13 02:50:25'),
(4, 'Healthcare Research Opportunities', 'Grants available for healthcare innovation.', '2024-11-13 02:50:25'),
(5, 'Blockchain Tech Advances', 'Exploring new developments in blockchain.', '2024-11-13 02:50:25'),
(6, 'Data Science Workshops', 'Upcoming workshops for data science professionals.', '2024-11-13 02:50:25'),
(7, 'Innovation in Education', 'New funding for tech in education.', '2024-11-13 02:50:25'),
(8, 'Social Impact Grants', 'Grants for tech solutions with social impact.', '2024-11-13 02:50:25'),
(9, 'Renewable Energy Focus', 'Funding available for renewable energy research.', '2024-11-13 02:50:25'),
(10, 'AI for Good Summit', 'Global summit on AI for social good.', '2024-11-13 02:50:25');

-- --------------------------------------------------------

--
-- Table structure for table `Registered_Events`
--

CREATE TABLE `Registered_Events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Registered_Events`
--

INSERT INTO `Registered_Events` (`id`, `user_id`, `event_id`, `registration_date`) VALUES
(1, 1, 1, '2024-11-13 02:51:11'),
(2, 2, 2, '2024-11-13 02:51:11'),
(3, 3, 3, '2024-11-13 02:51:11'),
(4, 4, 4, '2024-11-13 02:51:11'),
(5, 5, 5, '2024-11-13 02:51:11'),
(6, 6, 6, '2024-11-13 02:51:11'),
(7, 7, 7, '2024-11-13 02:51:11'),
(8, 8, 8, '2024-11-13 02:51:11'),
(9, 9, 9, '2024-11-13 02:51:11'),
(11, 1, 2, '2024-11-16 05:25:33');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `posts` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `title`, `posts`) VALUES
(1, 'ML and AI Disadvantages', 0),
(2, 'Post 2', 0),
(3, 'AI', 0);

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` varchar(50) NOT NULL,
  `upload_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `file_name`, `file_size`, `upload_date`) VALUES
(1, 'ATS_Compliant_Technologies_Skills_Table_Side_By_Side.xlsx', '6.3 KB', '2024-11-16 04:44:26'),
(2, 'Assignment+3+-+Project+COCOMO+Estimate+Template+CSE+5325+-+Fall+2024.docx', '30.97 KB', '2024-11-16 06:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Researcher','Funder','Admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `fullName`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'User1', 'user1@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Researcher', '2024-11-13 02:48:11'),
(2, 'User2', 'user2@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Funder', '2024-11-13 02:48:11'),
(3, 'User3', 'user3@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Admin', '2024-11-13 02:48:11'),
(4, 'User4', 'user4@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Researcher', '2024-11-13 02:48:11'),
(5, 'User5', 'user5@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Funder', '2024-11-13 02:48:11'),
(6, 'User6', 'user6@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Admin', '2024-11-13 02:48:11'),
(7, 'User7', 'user7@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Researcher', '2024-11-13 02:48:11'),
(8, 'User8', 'user8@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Funder', '2024-11-13 02:48:11'),
(9, 'User9', 'user9@example.com', '$2y$10$.rWskS8EBfiXkZrpUU8Wu.KRwiRtN3fvFp3P4f45nC3WrALj0cCRW', 'Admin', '2024-11-13 02:48:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Applications`
--
ALTER TABLE `Applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `grant_id` (`grant_id`);

--
-- Indexes for table `ContactSupport`
--
ALTER TABLE `ContactSupport`
  ADD PRIMARY KEY (`support_id`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`Event_id`);

--
-- Indexes for table `Grants`
--
ALTER TABLE `Grants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `HelpSupport`
--
ALTER TABLE `HelpSupport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Proposals`
--
ALTER TABLE `Proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RecentNews`
--
ALTER TABLE `RecentNews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Registered_Events`
--
ALTER TABLE `Registered_Events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_event` (`user_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Applications`
--
ALTER TABLE `Applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ContactSupport`
--
ALTER TABLE `ContactSupport`
  MODIFY `support_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `Event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Grants`
--
ALTER TABLE `Grants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `HelpSupport`
--
ALTER TABLE `HelpSupport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Profile`
--
ALTER TABLE `Profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Proposals`
--
ALTER TABLE `Proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `RecentNews`
--
ALTER TABLE `RecentNews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Registered_Events`
--
ALTER TABLE `Registered_Events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Applications`
--
ALTER TABLE `Applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`grant_id`) REFERENCES `Grants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Registered_Events`
--
ALTER TABLE `Registered_Events`
  ADD CONSTRAINT `registered_events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registered_events_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Events` (`Event_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
