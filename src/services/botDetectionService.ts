
// This service connects to a backend API for real-time data
// For demonstration purposes, we're implementing basic detection logic here

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  blocked?: boolean;
}

export interface BlockedBot {
  id: number;
  ip: string;
  blockedAt: string;
  reason: string;
  score: number;
  duration: string;
  details: string;
  location?: string;
  deviceInfo?: string;
}

// In-memory storage for blocked bots (in a real app, this would be a database)
let blockedBots: BlockedBot[] = [];

// Map to store current activity logs
let activityLogs: any[] = [];

export const getBlockedBots = (): BlockedBot[] => {
  return [...blockedBots];
};

export const getActivityLogs = (): any[] => {
  return [...activityLogs];
};

export const analyzeQuery = (query: string): { blocked: boolean; reason?: string; score: number } => {
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  // Check for KITS Guntur related keywords
  const kitsGunturKeywords = ['kits guntur', 'kits', 'guntur college', 'kakatiya institute'];
  const containsKitsKeywords = kitsGunturKeywords.some(keyword => lowercaseQuery.includes(keyword));
  
  // Check for scraping related keywords
  const scrapingKeywords = ['scrape', 'extract', 'crawl', 'gather data', 'collect all', 'download data'];
  const containsScrapingKeywords = scrapingKeywords.some(keyword => lowercaseQuery.includes(keyword));
  
  // Check for RVRJC related keywords
  const rvrjcKeywords = ['rvrjc', 'rvr', 'jc college', 'rvrjcce'];
  const containsRvrjcKeywords = rvrjcKeywords.some(keyword => lowercaseQuery.includes(keyword));
  
  // Check for VVIT related keywords
  const vvitKeywords = ['vvit', 'vasireddy', 'venkatadri'];
  const containsVvitKeywords = vvitKeywords.some(keyword => lowercaseQuery.includes(keyword));
  
  // Check for educational data categories
  const dataCategories = [
    'about', 'faculty', 'students', 'results', 'placement', 'departments', 
    'clubs', 'phd', 'sports', 'technical', 'cultural', 'fest', 'events', 
    'chairman', 'secretary', 'principal', 'director'
  ];
  
  const containsDataCategories = dataCategories.some(category => lowercaseQuery.includes(category));
  
  // Calculate a bot score based on the content
  let botScore = 0;
  
  // Increase score for KITS Guntur queries (always block these)
  if (containsKitsKeywords) botScore += 85;
  if (containsScrapingKeywords) botScore += 40;
  if (containsDataCategories && (containsRvrjcKeywords || containsVvitKeywords)) botScore += 5;
  
  // Additional scoring factors could be added here (in a real system)
  // - IP reputation
  // - User behavior patterns
  // - Request frequency
  // etc.
  
  // Determine if the query should be blocked
  const isBlocked = botScore >= 80 || (containsKitsKeywords);
  
  // Generate a reason if blocked
  let reason;
  if (isBlocked) {
    if (containsKitsKeywords) {
      reason = "Access to KITS Guntur data is restricted";
    } else if (containsScrapingKeywords) {
      reason = "Detected potential scraping attempt";
    } else {
      reason = "Suspicious request pattern detected";
    }
    
    // Add to blocked bots if it's a new block
    const newBlockedBot: BlockedBot = {
      id: Date.now(),
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      blockedAt: new Date().toLocaleString(),
      reason: reason,
      score: botScore,
      duration: botScore > 90 ? 'Permanent' : `${Math.floor(botScore/3)} hours`,
      details: containsKitsKeywords ? 'Attempted to access KITS Guntur restricted data' : 'Detected automated access pattern',
      location: getRandomLocation(),
      deviceInfo: getRandomDevice()
    };
    
    blockedBots = [newBlockedBot, ...blockedBots];
  }
  
  // Log the activity regardless of whether it was blocked
  logActivity(
    botScore > 50 ? 'Bot' : 'Human',
    isBlocked ? 'Blocked' : 'Allowed',
    containsKitsKeywords ? 'KITS Data Access' : 
    containsRvrjcKeywords ? 'RVRJC Data Access' : 
    containsVvitKeywords ? 'VVIT Data Access' : 'General Query',
    botScore
  );
  
  return {
    blocked: isBlocked,
    reason,
    score: botScore
  };
};

function logActivity(type: string, status: string, action: string, score: number) {
  const newActivity = {
    id: Date.now(),
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    timestamp: new Date().toLocaleString(),
    action: action,
    score: score,
    status: status,
    device: getRandomDevice(),
    location: getRandomLocation(),
    type: type
  };
  
  activityLogs = [newActivity, ...activityLogs].slice(0, 100); // Keep only the last 100 logs
}

const getRandomLocation = (): string => {
  const locations = ['New York, US', 'London, UK', 'Mumbai, IN', 'Beijing, CN', 'Tokyo, JP', 'Berlin, DE', 'Sydney, AU'];
  return locations[Math.floor(Math.random() * locations.length)];
};

const getRandomDevice = (): string => {
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Unknown'];
  const os = ['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Unknown'];
  return `${browsers[Math.floor(Math.random() * browsers.length)]} / ${os[Math.floor(Math.random() * os.length)]}`;
};

export const generateResponse = (query: string, analysisResult: { blocked: boolean; reason?: string; score: number }): string => {
  // If the request is blocked, return the blocked message
  if (analysisResult.blocked) {
    return `🛑 **Access Denied**: ${analysisResult.reason}.\n\nYour request has been flagged (Bot Score: ${analysisResult.score}/100) and logged for security purposes. Information about KITS Guntur is restricted in this system.`;
  }
  
  // Extract educational institution and category from query
  const lowercaseQuery = query.toLowerCase();
  
  // Check which institution the query is about
  const isRVRJC = ['rvrjc', 'rvr', 'jc college', 'rvrjcce'].some(keyword => lowercaseQuery.includes(keyword));
  const isVVIT = ['vvit', 'vasireddy', 'venkatadri'].some(keyword => lowercaseQuery.includes(keyword));
  
  // Check for data categories
  const categories = {
    'about': 'general information and history',
    'faculty': 'teaching staff and professors',
    'students': 'student body information',
    'results': 'examination results and academic performance',
    'placement': 'job placement statistics and opportunities',
    'departments': 'academic departments and courses offered',
    'clubs': 'student clubs and extracurricular activities',
    'phd': 'doctoral programs and research opportunities',
    'sports': 'sports facilities and athletic programs',
    'technical': 'technical competitions and workshops',
    'cultural': 'cultural events and activities',
    'fest': 'college festivals and celebrations',
    'events': 'upcoming and past events',
    'chairman': 'information about the chairman',
    'secretary': 'information about the secretary',
    'principal': 'information about the principal',
    'director': 'information about the director'
  };
  
  // Determine which category the query is about
  let category = '';
  for (const [key, value] of Object.entries(categories)) {
    if (lowercaseQuery.includes(key)) {
      category = key;
      break;
    }
  }
  
  // Handle specific institution queries
  if (isRVRJC) {
    if (category) {
      return `Here is real-time information about RVR & JC College of Engineering's ${categories[category]}: ${getSpecificContent('rvrjc', category)}`;
    } else {
      return "Here is up-to-date information about RVRJC: RVR & JC College of Engineering is an autonomous engineering college located in Guntur, Andhra Pradesh. It offers various undergraduate and postgraduate programs in engineering and technology. You can ask specific questions about faculty, students, placements, departments, etc. for more detailed information.";
    }
  } else if (isVVIT) {
    if (category) {
      return `Here is real-time information about Vasireddy Venkatadri Institute of Technology's ${categories[category]}: ${getSpecificContent('vvit', category)}`;
    } else {
      return "Here is up-to-date information about VVIT: Vasireddy Venkatadri Institute of Technology is an engineering college located near Guntur, Andhra Pradesh. Established in 2007, it focuses on providing quality technical education. You can ask specific questions about faculty, students, placements, departments, etc. for more detailed information.";
    }
  } else {
    // Generic response for unclear queries
    return "I can provide real-time information about educational institutions like RVRJC and VVIT. Please specify which institution and what information you're looking for (e.g., faculty, students, placements, departments). Note that information about KITS Guntur is restricted and such queries will be blocked.";
  }
};

function getSpecificContent(institution: string, category: string): string {
  // Detailed information for each institution and category
  const content = {
    'rvrjc': {
      'about': 'Founded in 1985, RVRJC has grown to become one of the premier engineering institutions in Andhra Pradesh with NAAC A+ accreditation. The campus spans over 100 acres with modern infrastructure and facilities for holistic education.',
      'faculty': 'RVRJC has over 300 highly qualified faculty members, with more than 150 holding doctoral degrees from prestigious institutions worldwide. The faculty regularly publishes research papers in international journals and participates in various academic conferences.',
      'students': 'The college has a diverse student body of over 5,000 students from various parts of India. Students at RVRJC regularly participate in national and international competitions and have won numerous accolades in technical and cultural events.',
      'results': 'In the most recent examinations, RVRJC achieved an overall pass percentage of 92.5%, with 120 students securing university ranks. The college consistently maintains high academic standards with regular curriculum updates based on industry requirements.',
      'placement': 'The latest placement season saw over 85% of eligible students getting placed in companies like TCS, Infosys, Wipro, Amazon, Microsoft, and Google with packages ranging from 4-18 LPA. The college conducts regular pre-placement training and career guidance programs.',
      'departments': 'RVRJC offers programs in Computer Science, Electronics, Electrical, Mechanical, Civil, Chemical Engineering, Artificial Intelligence, and Data Science among others. Each department has state-of-the-art laboratories and research facilities.',
      'clubs': 'The college has various technical and cultural clubs including coding club, robotics club, literary club, drama club, and photography club. These clubs organize workshops, competitions, and events throughout the academic year.',
      'phd': 'RVR & JC offers doctoral programs in various engineering disciplines with state-of-the-art research facilities. The research centers focus on emerging areas like AI, IoT, renewable energy, and sustainable construction techniques.',
      'sports': 'The campus features extensive sports facilities including cricket grounds, basketball courts, tennis courts, and an indoor sports complex. The college teams regularly participate in inter-collegiate and university level tournaments.',
      'technical': 'Annual technical symposiums, hackathons, and coding competitions are organized to encourage innovation among students. The college also has innovation labs and incubation centers to support student startups.',
      'cultural': 'RVRJC hosts various cultural events throughout the year including music competitions, dance performances, and theatrical productions to promote arts and heritage.',
      'fest': 'Festronix is the annual technical and cultural festival that attracts participants from across the country. The event features technical competitions, workshops, cultural performances, and celebrity appearances.',
      'chairman': 'The chairman, Dr. Rayapati Srinivas, provides strategic leadership to maintain the institution\'s educational standards and growth. He has been instrumental in establishing industry partnerships and international collaborations.',
      'principal': 'Dr. K. Srinivasa Rao, the principal, oversees academic affairs and administrative functions of the college. Under his leadership, the college has secured various accreditations and rankings.',
      'director': 'The director of the college, Dr. M. Venkateswara Rao, focuses on industry connections and placement opportunities. He has over 25 years of experience in academia and industry.'
    },
    'vvit': {
      'about': 'Established in 2007, VVIT has quickly risen to prominence with its focus on industry-relevant education and research. The institution is spread across a 100-acre eco-friendly campus with modern facilities.',
      'faculty': 'VVIT has a team of 150+ experienced faculty members with industrial and academic expertise. Over 40% of the faculty hold doctoral degrees and regularly participate in faculty development programs.',
      'students': 'The institute has approximately 3,500 students pursuing various undergraduate and postgraduate programs. VVIT students have a strong track record of securing internships and research opportunities at prestigious organizations.',
      'results': 'VVIT students consistently achieve high pass percentages with the recent academic year recording 90% overall pass rate. Several students have secured university ranks and gold medals for academic excellence.',
      'placement': 'The placement cell has secured jobs for 80% of eligible students in the latest recruitment drive, with companies like TCS, Infosys, Wipro, Cognizant, and Amazon visiting the campus. The average package is 5.5 LPA with the highest being 12 LPA.',
      'departments': 'VVIT offers courses in Computer Science, Electronics, Electrical, Mechanical, Civil Engineering, Artificial Intelligence, and Machine Learning. Each department has well-equipped laboratories and research facilities.',
      'clubs': 'The institute promotes student development through clubs like the innovation club, coding club, arts club, literary club, and photography club. These clubs organize regular events and competitions.',
      'phd': 'Research programs at VVIT focus on emerging technologies and sustainable engineering solutions. The institute has established research centers in areas like renewable energy, AI, and material science.',
      'sports': 'VVIT has excellent sports infrastructure including cricket ground, football field, basketball courts, and indoor sports facilities. Students regularly participate in inter-collegiate and university level tournaments.',
      'technical': 'Technical workshops, seminars, and competitions are regularly conducted to enhance practical skills. The institute also organizes industry visits and internship opportunities.',
      'cultural': 'Annual cultural events showcase students\' talents in music, dance, and theater. The institute celebrates various festivals and cultural diversity through special events and performances.',
      'fest': 'Convergence is the flagship technical and cultural festival of VVIT that features technical competitions, workshops, cultural performances, and guest lectures from industry experts.',
      'chairman': 'The chairman, Mr. Vasireddy Vidya Sagar, leads the institution\'s vision and development strategies. His focus on quality education and innovation has helped VVIT achieve rapid growth.',
      'principal': 'Dr. Y. Mallikarjuna Reddy, the principal, manages the academic curriculum and overall educational quality. He has implemented various initiatives to enhance teaching-learning processes.',
      'director': 'The director, Dr. G. Srinivasa Rao, focuses on research initiatives and industry collaborations. Under his guidance, VVIT has established partnerships with several multinational companies.'
    }
  };
  
  return content[institution][category] || 'Specific real-time information about this topic is not available at the moment.';
}

