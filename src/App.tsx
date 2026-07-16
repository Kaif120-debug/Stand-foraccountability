import React, { useState, useEffect } from "react";
import { 
  AnimatePresence, 
  motion 
} from "motion/react";
import { 
  Gavel, 
  Menu, 
  X, 
  Mail, 
  Share2, 
  Camera, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Download, 
  Users, 
  FileCheck, 
  Send,
  MessageCircle
} from "lucide-react";

// Types for application state
type ModalTab = "actions" | "email-recipients" | "email-compose" | "instagram-detail" | "tweet-compose";

interface Recipient {
  name: string;
  email: string;
  description: string;
}

interface SupportMessage {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
}

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ModalTab>("actions");
  
  // Interactive Email State
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [userName, setUserName] = useState("");
  const [customSubject, setCustomSubject] = useState("Request for Resignation and Accountability");
  const [customBody, setCustomBody] = useState(
    `Dear Sir/Madam,\n\nI am writing as a concerned citizen to express my disappointment regarding recent developments in the education system. In my view, these events have raised serious questions about accountability and public trust.\n\nI respectfully urge the leadership to consider whether the current Education Minister should resign and allow an impartial review of the situation. I believe that accepting responsibility and ensuring transparency are important steps toward restoring confidence in our education system.\n\nMy intention is not to criticize individuals personally, but to encourage accountability and meaningful action in the public interest. I hope this concern will be given due consideration.\n\nThank you for your time and attention.\n\nSincerely,`
  );

  // Interactive Tweet State
  const [tweetText, setTweetText] = useState(
    "I believe accountability is essential to restoring public trust. I respectfully urge the government to ensure an independent, transparent investigation into recent education system concerns. Students deserve fairness. #Education #Accountability"
  );

  // Accordion/FAQ States
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Supporting Actions Log State (Persisted in localStorage)
  const [actionsCount, setActionsCount] = useState(14250);
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);
  const [newSignName, setNewSignName] = useState("");
  const [newSignLocation, setNewSignLocation] = useState("");
  const [newSignMessage, setNewSignMessage] = useState("");

  const recipients: Recipient[] = [
    {
      name: "Bhartiya Janta Party",
      email: "bjphqo@gmail.com",
      description: "Submit a public grievance request for thorough independent probe."
    },
    {
      name: "Supreme Court of India",
      email: "supremecourt@nic.in",
      description: "Petition of public concern regarding constitutional oversight."
    }
  ];

  // Load and generate initial data
  useEffect(() => {
    // Generate a default set of support messages if empty
    const savedMessages = localStorage.getItem("accountability_support_messages");
    if (savedMessages) {
      setSupportMessages(JSON.parse(savedMessages));
    } else {
      const defaultMessages: SupportMessage[] = [
        {
          id: "1",
          name: "Amit S.",
          location: "New Delhi",
          message: "Our education system must set the standard for absolute transparency and honesty. Stand strong!",
          timestamp: "Just now"
        },
        {
          id: "2",
          name: "Priyanka K.",
          location: "Mumbai",
          message: "Advocating peacefully for accountability is our democratic right and civic duty.",
          timestamp: "2 mins ago"
        },
        {
          id: "3",
          name: "Dr. Rajesh V.",
          location: "Bengaluru",
          message: "Academic integrity cannot be compromised. We need immediate independent investigations.",
          timestamp: "10 mins ago"
        }
      ];
      setSupportMessages(defaultMessages);
      localStorage.setItem("accountability_support_messages", JSON.stringify(defaultMessages));
    }

    // Load action counter
    const savedCount = localStorage.getItem("accountability_actions_count");
    if (savedCount) {
      setActionsCount(parseInt(savedCount));
    } else {
      const initialCount = 14250 + Math.floor(Math.random() * 100);
      setActionsCount(initialCount);
      localStorage.setItem("accountability_actions_count", initialCount.toString());
    }
  }, []);

  // Show Toast Feedback
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Copy Caption Helper
  const handleCopyCaption = () => {
    const text = "Standing for accountability today and every day. We believe in transparency, leadership, and peaceful civic engagement. #StandForAccountability #CivicDuty";
    navigator.clipboard.writeText(text).then(() => {
      triggerToast("Instagram Caption copied to clipboard!");
    });
  };

  // Open email application
  const triggerSendEmail = (recipientEmail: string) => {
    const emailTo = recipientEmail;
    const finalBody = `${customBody}\n\n${userName || "Concerned Citizen"}`;
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(finalBody)}`;
    
    try {
      // Creating a physical anchor element and clicking it is highly reliable inside iframe environments
      const body = encodeURIComponent(finalBody);
      const subject = encodeURIComponent(customSubject);

      // Try Gmail app first
      window.location.href =
        `googlegmail://co?to=${emailTo}&subject=${subject}&body=${body}`;

      // Fallback to Gmail web after a short delay
      setTimeout(() => {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`,
          "_blank"
        );
      }, 1200);
    } catch (error) {
      // Fallback
      window.location.href = mailtoUrl;
    }
    
    // Increment action counter
    const newCount = actionsCount + 1;
    setActionsCount(newCount);
    localStorage.setItem("accountability_actions_count", newCount.toString());
    triggerToast("Opening system mail app...");
  };

  // Copy full compiled email draft
  const handleCopyEmailDraft = () => {
    const finalBody = `${customBody}\n\n${userName || "Concerned Citizen"}`;
    const fullText = `To: ${selectedRecipient?.email}\nSubject: ${customSubject}\n\n${finalBody}`;
    navigator.clipboard.writeText(fullText).then(() => {
      triggerToast("Email draft copied to clipboard!");
    });
  };


  const copyRecipientEmail = async () => {
    if (!selectedRecipient) return;
    await navigator.clipboard.writeText(selectedRecipient.email);
    triggerToast("Recipient email copied!");
  };

  const copyEmailMessage = async () => {
    const finalBody = `${customBody}\n\n${userName || "Concerned Citizen"}`;
    await navigator.clipboard.writeText(finalBody);
    triggerToast("Email message copied!");
  };

  // Submit Support Form
  const handleAddSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignName.trim() || !newSignMessage.trim()) {
      triggerToast("Please provide your name and message.");
      return;
    }

    const newMessage: SupportMessage = {
      id: Date.now().toString(),
      name: newSignName.trim(),
      location: newSignLocation.trim() || "India",
      message: newSignMessage.trim(),
      timestamp: "Just now"
    };

    const updated = [newMessage, ...supportMessages.slice(0, 5)];
    setSupportMessages(updated);
    localStorage.setItem("accountability_support_messages", JSON.stringify(updated));
    
    const newCount = actionsCount + 1;
    setActionsCount(newCount);
    localStorage.setItem("accountability_actions_count", newCount.toString());

    setNewSignName("");
    setNewSignLocation("");
    setNewSignMessage("");
    triggerToast("Your voice has been added to the public log!");
  };

  const faqs = [
    {
      q: "What is the primary mission of Stand for Accountability?",
      a: "Our mission is to empower citizens to engage in peaceful, lawful, and constructive civic participation. We believe transparency and high ethical standards are essential to public trust in democratic leadership and institutional education."
    },
    {
      q: "Is this platform affiliated with any political party?",
      a: "No. We are entirely non-partisan, community-funded, and citizen-led. Our focus is strictly on accountability, systemic transparency, and the fundamental right of peaceful petition as recognized by constitutional frameworks."
    },
    {
      q: "How does writing an email create real impact?",
      a: "Direct representative outreach is one of the most powerful forms of peaceful lobby. When institutional heads and judicial oversight bodies receive thousands of respectful, well-reasoned correspondences from real citizens, it legally documents public concern and demands formal transparency reviews."
    },
    {
      q: "Can I remain anonymous while using this portal?",
      a: "Yes. While standard emails require your direct contact details, our community advocacy wall is optional and lets you post anonymously or use initials if you prefer. We respect user privacy entirely."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-white text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/20"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-label-md text-xs font-semibold tracking-wider uppercase">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-[30px] border-b border-white/10 flex items-center justify-between px-6 md:px-16 h-16">
        <div className="flex items-center gap-3">
          <Gavel className="w-6 h-6 text-primary" />
          <span className="font-montserrat text-lg md:text-xl font-bold tracking-tighter uppercase text-primary">
            STAND FOR ACCOUNTABILITY
          </span>
        </div>
        
        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-primary focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a className="text-primary font-label-md transition-opacity hover:opacity-80 uppercase text-xs tracking-wider" href="#">Home</a>
          <a className="text-on-surface-variant font-label-md transition-opacity hover:opacity-80 uppercase text-xs tracking-wider" href="#mission">Mission</a>
          <a className="text-on-surface-variant font-label-md transition-opacity hover:opacity-80 uppercase text-xs tracking-wider" href="#petition">Advocacy Wall</a>
          <a className="text-on-surface-variant font-label-md transition-opacity hover:opacity-80 uppercase text-xs tracking-wider" href="#transparency">Frameworks</a>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 w-full bg-background/95 backdrop-blur-[30px] border-b border-white/10 z-40 md:hidden overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-primary font-label-md uppercase text-sm tracking-wider" 
                href="#"
              >
                Home
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-on-surface-variant font-label-md uppercase text-sm tracking-wider" 
                href="#mission"
              >
                Mission
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-on-surface-variant font-label-md uppercase text-sm tracking-wider" 
                href="#petition"
              >
                Advocacy Wall
              </a>
              <a 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-on-surface-variant font-label-md uppercase text-sm tracking-wider" 
                href="#transparency"
              >
                Frameworks
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative pt-16">
        
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 md:px-16 text-center hero-gradient overflow-hidden">
          <div className="max-w-4xl space-y-8 z-10">

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-montserrat text-4xl md:text-7xl lg:text-8xl text-primary uppercase font-extrabold leading-none tracking-tight"
            >
              Stand for <br />
              <span className="text-white">Accountability</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-base md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed"
            >
              Raise your voice through peaceful and lawful civic participation. Join thousands in demanding transparency and integrity in our leadership.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6"
            >
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  setModalTab("actions");
                }}
                className="px-12 py-5 bg-white text-background font-montserrat font-bold tracking-wider rounded-full text-lg hover:bg-neutral-200 active:scale-95 transition-all duration-300 shadow-2xl shadow-white/5 cursor-pointer uppercase"
              >
                Take Action Now
              </button>
            </motion.div>
          </div>

          {/* Background Decorative Gradient Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Scroll Prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/40">
            <span className="font-sans text-[10px] uppercase tracking-widest font-semibold">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </section>

        {/* Bento Grid Info Section */}
        <section id="mission" className="py-24 px-6 md:px-16 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Bento Block 1: Power of Peace */}
            <div className="md:col-span-8 glass p-8 md:p-12 rounded-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-montserrat text-3xl md:text-4xl font-bold tracking-tight text-primary">
                  The Power of Peace
                </h2>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Civic duty isn't just a right—it's a responsibility. By participating in respectful, organized outreach, we ensure the voices of the people are heard where they matter most. Our collective action creates a ripple effect of accountability that resonates across the nation. We adhere strictly to peaceful, legal channels of advocacy.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <span>Peaceful Assembly & Petition Frameworks</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>

            {/* Bento Block 2: Visual Impact Cover */}
            <div 
              className="md:col-span-4 rounded-2xl overflow-hidden min-h-[300px] relative group border border-white/10 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8rr4pHyVUYMN87nJ7IM5Bad7l9_dPIdbDR8trkYFZrf5pYCZHImKW0BR0NI2mUGO0hUFcps33Um9b0RevBwb2b-6syb3odo0RTODPqDF8sxOVadqyyVYlV62im04suQe_U_eX6lLm4Gq0QHapTErtEMfXx0Lm40PkXXCgBC-fi-KbfKp9zEd30uuBOnDkoLopG24gcJ5NDlaqu9Dy4zfQaStlkPyb5OgJvzyUJt3oQgcefZ8DGDDZZ03dFsiD_9xfjJdcYEifcic')` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary bg-white/10 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  Advocacy Visual
                </span>
                <h4 className="font-montserrat text-lg font-bold text-white mt-3">United For Transparency</h4>
              </div>
            </div>

            {/* Bento Block 3: Legal Transparency */}
            <div id="transparency" className="md:col-span-12 glass p-8 md:p-12 rounded-2xl space-y-8 relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-primary">
                  Legal Transparency & Accord
                </h3>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Access official resources and documentation to ensure your advocacy remains entirely within the constitutional framework of peaceful assembly and petition. Knowledge is our strongest pillar.
                </p>
              </div>

              {/* Accordion / FAQ section */}
              <div className="mt-8 border-t border-white/10 pt-4 space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-white/5 pb-4">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center text-left py-3 font-semibold text-primary hover:text-white transition-colors group"
                    >
                      <span className="font-sans text-sm md:text-base font-medium tracking-tight">{faq.q}</span>
                      {expandedFaq === idx ? (
                        <ChevronUp className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-on-surface-variant group-hover:text-primary" />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {expandedFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-2 pb-1 text-xs md:text-sm text-on-surface-variant leading-relaxed pl-2 border-l border-white/10">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Live Public Log & Community Signature block */}
        <section id="petition" className="py-20 bg-neutral-950 border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Col: Public Log */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-montserrat text-xl md:text-2xl font-bold uppercase tracking-wider text-primary">
                  Live Public Advocacy Log
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant max-w-lg">
                See real-time support from people all across the nation raising their voice for institutional accountability. 
              </p>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {supportMessages.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="glass p-5 rounded-xl border border-white/5 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-primary text-sm">{item.name}</span>
                        <span className="text-xs text-on-surface-variant ml-2">from {item.location}</span>
                      </div>
                      <span className="text-[10px] text-on-surface-variant font-mono bg-white/5 px-2 py-0.5 rounded">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed italic">
                      "{item.message}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Col: Add Your Voice Form */}
            <div className="lg:col-span-5 glass p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-fit space-y-6">
              <div className="space-y-2">
                <h3 className="font-montserrat text-xl font-bold text-primary">
                  Add Your Support Statement
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Your message will be displayed on this portal's civic log instantly to encourage others to participate.
                </p>
              </div>

              <form onSubmit={handleAddSupport} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Your Name / Initials *
                  </label>
                  <input 
                    type="text" 
                    value={newSignName}
                    onChange={(e) => setNewSignName(e.target.value)}
                    required
                    placeholder="e.g. Rahul K. or Anonymous" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Location (City / State)
                  </label>
                  <input 
                    type="text" 
                    value={newSignLocation}
                    onChange={(e) => setNewSignLocation(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-neutral-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1.5">
                    Your Message for Accountability *
                  </label>
                  <textarea 
                    value={newSignMessage}
                    onChange={(e) => setNewSignMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Write a brief, respectful statement urging for integrity and transparent investigations." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white placeholder:text-neutral-600 resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-background font-montserrat font-bold tracking-wider rounded-lg text-xs hover:bg-neutral-200 active:scale-95 transition-all uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish My Statement</span>
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6 md:px-16 text-center text-on-surface-variant space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Gavel className="w-5 h-5 text-primary" />
          <span className="font-montserrat font-bold text-xs tracking-wider uppercase text-primary">
            STAND FOR ACCOUNTABILITY
          </span>
        </div>
        <p className="text-xs max-w-md mx-auto leading-relaxed">
          This advocacy application is built to foster lawful transparency and public accountability. Please use the campaign resources respectfully.
        </p>
        <p className="text-[10px] font-mono opacity-50">
          © {new Date().getFullYear()} Stand For Accountability. All Rights Reserved.
        </p>
      </footer>


      {/* Multi-Step Action Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/90 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="glass w-full max-w-3xl rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl border border-white/10 bg-neutral-900"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-on-surface-variant hover:text-white transition-colors z-10 p-1 bg-white/5 rounded-full"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header (Changes depending on sub-views) */}
              {modalTab === "actions" && (
                <div className="text-center mb-8">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    Advocacy Center
                  </span>
                  <h2 className="font-montserrat text-2xl md:text-4xl font-extrabold text-primary uppercase mt-4 mb-2">
                    Choose Your Impact
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant max-w-md mx-auto">
                    Your voice is the most powerful tool for change. Choose a path below to register your peaceful support.
                  </p>
                </div>
              )}

              {/* VIEW 1: Main Action Selector Grid */}
              {modalTab === "actions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Send Email Action */}
                  <button 
                    onClick={() => setModalTab("email-recipients")}
                    className="glass p-6 rounded-xl group hover:border-white/30 transition-all flex flex-col items-center text-center cursor-pointer bg-white/5"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-primary mb-1">
                      Send an Email
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed max-w-[220px]">
                      Select an official oversight agency, review your draft letter, and send.
                    </p>
                    <span className="mt-auto font-sans font-bold text-[10px] tracking-wider text-primary opacity-60 group-hover:opacity-100 uppercase transition-opacity flex items-center gap-1">
                      <span>Select Recipient</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </button>

                  {/* Share on X Action */}
                  <button 
                    onClick={() => setModalTab("tweet-compose")}
                    className="glass p-6 rounded-xl group hover:border-white/30 transition-all flex flex-col items-center text-center bg-white/5 cursor-pointer w-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <Share2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-primary mb-1">
                      Share on X / Twitter
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed max-w-[220px]">
                      Post a customized or pre-compiled advocacy message directly to your timeline.
                    </p>
                    <span className="mt-auto font-sans font-bold text-[10px] tracking-wider text-primary opacity-60 group-hover:opacity-100 uppercase transition-opacity flex items-center gap-1">
                      <span>Draft Tweet</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </button>

                  {/* Instagram Campaign Info Grid Box */}
                  <div className="glass p-6 rounded-xl group flex flex-col items-center text-center relative md:col-span-2 bg-white/5">
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-primary mb-1">
                      Instagram Stories Campaign
                    </h3>
                    
                    <div className="text-[11px] font-mono leading-relaxed text-on-surface-variant bg-neutral-950 p-3 rounded-lg mb-4 h-16 overflow-y-auto text-left w-full border border-white/5 select-all">
                      Standing for accountability today and every day. We believe in transparency, leadership, and peaceful civic engagement. #StandForAccountability #CivicDuty
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-auto">
                      <a 
                        download="campaign_image.jpg" 
                        href="https://lh3.googleusercontent.com/aida-public/AB6AXuCimaDu9mdeQcs2ydiq01eal45IObQBEbdXDlpPHdwQDeSBmzIzutXu8GM9xP3aaFDoIYHFY3-lsoAMtLwPgupB1akGSBEDb9Y6R5IqOmMkLdt-DPBUxIGnn7Hdn2j-c1tVWCFAuwVS9WJi6zdxWxX8JPmOhUtVMUNrdpjc4O4CjmIUc_mlK5LbA7U7q8OldWUefDLFSqIaCpRGSXNOoF_1Ubl3ySl_934XBf2i_Dok7GBH8QDv3cXAv_1ytVK6z8QWO44sYVhvuZ0"
                        referrerPolicy="no-referrer"
                        onClick={() => triggerToast("Downloading campaign visual assets...")}
                        className="py-3 bg-white/5 hover:bg-white/15 rounded-lg font-sans font-bold text-[11px] text-primary transition-all uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Campaign Visual</span>
                      </a>
                      
                      <button 
                        onClick={handleCopyCaption}
                        className="py-3 bg-white text-background hover:bg-neutral-200 rounded-lg font-sans font-bold text-[11px] transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Caption & Post</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW 2: Select Recipient List */}
              {modalTab === "email-recipients" && (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setModalTab("actions")}
                      className="text-on-surface-variant hover:text-white transition-colors flex items-center gap-1.5 font-sans font-bold uppercase text-[11px] bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> 
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <h3 className="font-montserrat text-xl md:text-2xl font-extrabold text-primary uppercase">
                      Select Recipient Agency
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1.5">
                      Select which official state or judicial organ you wish to address.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {recipients.map((rec) => (
                      <button 
                        key={rec.email}
                        onClick={() => {
                          setSelectedRecipient(rec);
                          setModalTab("email-compose");
                        }}
                        className="glass p-5 rounded-xl text-left hover:border-white/30 transition-all group bg-white/5 flex flex-col justify-between space-y-4 cursor-pointer"
                      >
                        <div className="space-y-1">
                          <h4 className="font-montserrat text-base font-bold text-primary group-hover:text-white transition-colors">
                            {rec.name}
                          </h4>
                          <p className="text-[10px] font-mono text-on-surface-variant">{rec.email}</p>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {rec.description}
                        </p>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-primary bg-white/5 px-2.5 py-1 rounded w-fit group-hover:bg-white/10 transition-colors">
                          Select Draft
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* VIEW 3: Interactive Letter Draft Composer */}
              {modalTab === "email-compose" && selectedRecipient && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setModalTab("email-recipients")}
                      className="text-on-surface-variant hover:text-white transition-colors flex items-center gap-1.5 font-sans font-bold uppercase text-[11px] bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> 
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-montserrat text-xl font-extrabold text-primary uppercase">
                      Address: {selectedRecipient.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Review, customize your signature, and edit the letter template.
                    </p>
                  </div>

                  <div className="space-y-3 mt-2">
                    
                    {/* Name input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                          Your Full Name (Sign-off) *
                        </label>
                        <input 
                          type="text" 
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Concerned Citizen" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white placeholder:text-neutral-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                          Subject Line
                        </label>
                        <input 
                          type="text" 
                          value={customSubject}
                          onChange={(e) => setCustomSubject(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white"
                        />
                      </div>
                    </div>

                    {/* Rich text template editor */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                        Email Letter Body
                      </label>
                      <textarea 
                        value={customBody}
                        onChange={(e) => setCustomBody(e.target.value)}
                        rows={8}
                        className="w-full bg-neutral-950 border border-white/10 rounded-lg p-3 text-xs leading-relaxed font-sans text-on-surface-variant focus:outline-none focus:border-white focus:ring-1 focus:ring-white resize-none"
                      />
                    </div>

                    {/* Preview of Compiled Name Sign-off */}
                    <div className="p-3.5 bg-neutral-950 rounded-lg border border-white/5 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Sign-off Preview:</span>
                        <span className="text-xs font-semibold text-white">Sincerely, {userName || "Concerned Citizen"}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                        Lawful & Peaceful Letter
                      </span>
                    </div>

                    {/* Actions Row */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                        <span>Send Options</span>
                        <div className="h-[1px] bg-white/10 flex-grow" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={handleCopyEmailDraft}
                          className="py-3 bg-white/5 hover:bg-white/10 rounded-lg font-sans font-bold text-[11px] text-primary transition-all uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Draft Template</span>
                        </button>

                        
                        <button
                          onClick={copyRecipientEmail}
                          className="py-3 bg-white/5 hover:bg-white/10 rounded-lg font-sans font-bold text-[11px] text-primary transition-all uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Recipient Email</span>
                        </button>

                        <button
                          onClick={copyEmailMessage}
                          className="py-3 bg-white/5 hover:bg-white/10 rounded-lg font-sans font-bold text-[11px] text-primary transition-all uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Email Message</span>
                        </button>

<a 
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedRecipient.email)}&su=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody + '\n\n' + (userName || 'Concerned Citizen'))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            const newCount = actionsCount + 1;
                            setActionsCount(newCount);
                            localStorage.setItem("accountability_actions_count", newCount.toString());
                            triggerToast("Opening Gmail...");
                          }}
                          className="py-3 bg-white text-background hover:bg-neutral-200 rounded-lg font-sans font-bold text-[11px] transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-center inline-flex items-center"
                        >
                          <Mail className="w-3.5 h-3.5 text-background" />
                          <span>Send via Gmail</span>
                        </a>
                      </div>

                      <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block text-center">
                          Or Compose in Other Webmail Services:
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <a 
                            href={`https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(selectedRecipient.email)}&subject=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody + '\n\n' + (userName || 'Concerned Citizen'))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              const newCount = actionsCount + 1;
                              setActionsCount(newCount);
                              localStorage.setItem("accountability_actions_count", newCount.toString());
                              triggerToast("Opening Outlook...");
                            }}
                            className="py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg font-sans font-bold text-[10px] text-primary transition-all uppercase tracking-wider text-center flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                          >
                            <span className="text-blue-500 font-bold font-sans">O</span>utlook
                          </a>

                          <a 
                            href={`https://compose.mail.yahoo.com/?to=${encodeURIComponent(selectedRecipient.email)}&subj=${encodeURIComponent(customSubject)}&body=${encodeURIComponent(customBody + '\n\n' + (userName || 'Concerned Citizen'))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              const newCount = actionsCount + 1;
                              setActionsCount(newCount);
                              localStorage.setItem("accountability_actions_count", newCount.toString());
                              triggerToast("Opening Yahoo...");
                            }}
                            className="py-2.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg font-sans font-bold text-[10px] text-primary transition-all uppercase tracking-wider text-center flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                          >
                            <span className="text-purple-500 font-bold font-sans">Y</span>ahoo
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* VIEW 4: Interactive Tweet Composer */}
              {modalTab === "tweet-compose" && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setModalTab("actions")}
                      className="text-on-surface-variant hover:text-white transition-colors flex items-center gap-1.5 font-sans font-bold uppercase text-[11px] bg-white/5 px-3 py-1.5 rounded-full border border-white/5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> 
                      <span>Back</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-montserrat text-xl font-extrabold text-primary uppercase">
                      Draft Your Tweet / Post
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      Write your advocacy message. We enforce standard X character limits.
                    </p>
                  </div>

                  <div className="space-y-3 mt-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                        Tweet Text
                      </label>
                      <textarea 
                        value={tweetText}
                        onChange={(e) => setTweetText(e.target.value)}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white font-sans leading-relaxed"
                        placeholder="Type your tweet here..."
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        {tweetText.length > 280 ? (
                          <span className="text-red-500 font-semibold">
                            Tweet exceeds the 280-character limit.
                          </span>
                        ) : (
                          <span className="text-neutral-400">
                            {280 - tweetText.length} characters remaining
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-neutral-400">
                        <span className={tweetText.length > 280 ? "text-red-500 font-bold" : "text-primary"}>
                          {tweetText.length}
                        </span>/280
                      </div>
                    </div>

                    {tweetText.length > 280 && (
                      <button 
                        onClick={() => setTweetText(tweetText.substring(0, 280))}
                        className="py-1.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded border border-red-500/20 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer w-fit"
                      >
                        Auto-truncate to 280 characters
                      </button>
                    )}

                    <div className="pt-2">
                      {tweetText.length > 280 ? (
                        <div className="py-3.5 bg-neutral-800 text-neutral-500 rounded-lg font-sans font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-not-allowed border border-white/5">
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Fix character limit to send</span>
                        </div>
                      ) : (
                        <a 
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            const newCount = actionsCount + 1;
                            setActionsCount(newCount);
                            localStorage.setItem("accountability_actions_count", newCount.toString());
                            triggerToast("Redirecting to X...");
                          }}
                          className="py-3.5 bg-white text-background hover:bg-neutral-200 rounded-lg font-sans font-bold text-[11px] transition-all uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-center inline-flex items-center w-full"
                        >
                          <Share2 className="w-3.5 h-3.5 text-background" />
                          <span>Share on X / Twitter</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
