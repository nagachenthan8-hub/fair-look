import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotFound from "@/pages/not-found";
import { MessageCircle, ArrowUp, Menu, X, Scissors, Sparkles, Smile, Star, Phone, MapPin, Mail, Clock, ShieldCheck, Award, Heart, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

// Sections Data
const SERVICES = [
  {
    category: "Hair Services",
    icon: <Scissors className="w-8 h-8 mb-4 text-secondary" />,
    items: ["Hair Cut", "Hair Styling", "Hair Spa", "Hair Coloring", "Hair Smoothening", "Hair Straightening"]
  },
  {
    category: "Skin Care",
    icon: <Sparkles className="w-8 h-8 mb-4 text-secondary" />,
    items: ["Facial", "Cleanup", "Detan Treatment", "Bleach", "Skin Polishing"]
  },
  {
    category: "Makeup Services",
    icon: <Smile className="w-8 h-8 mb-4 text-secondary" />,
    items: ["Bridal Makeup", "Engagement Makeup", "Reception Makeup", "Party Makeup"]
  },
  {
    category: "Beauty Care",
    icon: <Heart className="w-8 h-8 mb-4 text-secondary" />,
    items: ["Eyebrow Shaping", "Threading", "Waxing", "Manicure", "Pedicure"]
  }
];

const TRAINING_COURSES = [
  { name: "Basic Makeup & Grooming", duration: "1 month", learn: "Foundations of makeup, personal grooming, and basic skin care." },
  { name: "Hair Styling Fundamentals", duration: "3 weeks", learn: "Cutting techniques, blow dry, basic coloring, and hair spa." },
  { name: "Skincare & Facial Techniques", duration: "2 weeks", learn: "Skin analysis, facial massage strokes, detan, and cleanup." },
  { name: "Complete Beauty Course", duration: "3 months", learn: "Comprehensive training covering hair, skin, makeup, and salon management." }
];

const BRIDAL_PACKAGES = [
  { name: "Silver", details: "Basic bridal makeup, simple hair styling, saree draping." },
  { name: "Gold", details: "HD bridal makeup, advanced hair styling, premium jewelry styling, saree draping.", popular: true },
  { name: "Platinum", details: "Airbrush bridal makeup, luxury hair styling, floral setting, pre-bridal cleanup, trial session." }
];

const TESTIMONIALS = [
  { name: "Priya S.", rating: 5, text: "Absolutely loved my bridal makeup. The staff is so professional and the salon is gorgeous!" },
  { name: "Anjali M.", rating: 5, text: "Best hair spa experience in town. They use premium products and the massage was heavenly." },
  { name: "Neha K.", rating: 4, text: "Got a diamond facial and my skin is glowing. Highly recommend Fair Look." },
  { name: "Simran R.", rating: 5, text: "Took their complete beauty course. The trainers are highly experienced. Worth every penny." },
  { name: "Pooja V.", rating: 5, text: "Very hygienic and luxurious ambiance. Their pedicure is a must-try." }
];

const FAQS = [
  { q: "Do I need an appointment?", a: "While walk-ins are welcome, we highly recommend booking an appointment to avoid waiting times, especially for premium services." },
  { q: "What bridal packages are available?", a: "We offer Silver, Gold, and Platinum bridal packages. Our Gold package is the most popular, featuring HD makeup and advanced hair styling." },
  { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, UPI, Google Pay, and cash." },
  { q: "How long does a facial take?", a: "A standard facial takes about 45 to 60 minutes, while premium facials like Diamond or Gold may take up to 90 minutes." },
  { q: "Do you offer party makeup services?", a: "Yes, we offer specialized party makeup for all occasions. Contact us to know more." },
  { q: "Are walk-ins accepted?", a: "Yes, subject to availability. However, appointments get priority." }
];

// Components
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["About", "Services", "Training", "Bridal", "Gallery", "Contact"];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className={`font-serif text-2xl font-bold ${scrolled ? 'text-secondary' : 'text-secondary'}`}>Fair Look</a>
        <nav className="hidden lg:flex gap-8 text-sm font-medium">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className={`transition-colors hover:text-secondary ${scrolled ? 'text-primary-foreground' : 'text-primary-foreground'}`}>{l}</a>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Book Appointment</Button>
        </div>
        <button className="lg:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-primary/95 backdrop-blur-md border-t border-primary-foreground/10 py-4 flex flex-col items-center gap-4 shadow-xl"
          >
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-primary-foreground font-medium text-lg hover:text-secondary">{l}</a>
            ))}
            <Button className="bg-secondary text-secondary-foreground mt-4 w-11/12">Book Appointment</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-primary flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/images/gallery-interior.png" alt="Luxury Salon" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-secondary mb-6 tracking-tight"
        >
          Enhancing Beauty,<br/>Confidence & Elegance
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-10"
        >
          Step into a world of luxury and personalized care. From bridal makeovers to premium skin treatments.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(201,169,110,0.4)]">Book Appointment</Button>
          <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-lg px-8 py-6 rounded-full">WhatsApp Now</Button>
          <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-full">View Services</Button>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">About Fair Look Beauty Parlour</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fair Look is more than just a salon; it's a sanctuary of beauty and relaxation. We pride ourselves on offering a deeply personal experience wrapped in luxury. With stringent hygiene protocols, premium international products, and a team of highly experienced beauticians, we ensure every visit leaves you feeling confident and radiant.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Happy Clients", value: "5,000+" },
            { label: "Bridal Makeovers", value: "1,200+" },
            { label: "Beauty Services", value: "50+" },
            { label: "Years of Experience", value: "15+" }
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={stat.label} 
              className="bg-card border border-card-border p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-serif">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-secondary mb-4">Our Premium Services</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">Curated treatments tailored for your ultimate grooming and relaxation.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={s.category} 
              className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 rounded-2xl hover:bg-primary-foreground/10 transition-colors group cursor-pointer"
            >
              {s.icon}
              <h3 className="text-2xl font-serif mb-4 text-secondary">{s.category}</h3>
              <ul className="space-y-2 mb-8 text-primary-foreground/80">
                {s.items.map(item => <li key={item} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-secondary" /> {item}</li>)}
              </ul>
              <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground">Book Now</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Training() {
  return (
    <section id="training" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Start Your Beauty Career</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Learn from experienced professionals. Master the art of beauty from the ground up with our specialized training courses.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINING_COURSES.map((course, i) => (
            <Card key={i} className="border-secondary/30 shadow-sm hover:shadow-lg transition-shadow bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-primary">{course.name}</CardTitle>
                <CardDescription className="text-secondary font-medium">{course.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.learn}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bridal() {
  return (
    <section id="bridal" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Bridal Excellence</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your wedding day deserves nothing less than perfection. Our premium bridal makeup services are designed to highlight your natural beauty and create a flawless, enduring look that shines both in person and on camera.
            </p>
            <div className="space-y-6 mb-8">
              {BRIDAL_PACKAGES.map(pkg => (
                <div key={pkg.name} className={`p-6 rounded-xl border ${pkg.popular ? 'border-secondary bg-secondary/5 relative' : 'border-border'}`}>
                  {pkg.popular && <span className="absolute -top-3 right-6 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-serif text-primary">{pkg.name} Package</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.details}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground w-full sm:w-auto">Consult our Bridal Experts</Button>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/bridal-showcase.png" alt="Luxury Bridal Makeup" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}


function Gallery() {
  const images = [
    "/images/bridal-showcase.png",
    "/images/gallery-interior.png",
    "/images/gallery-hair.png",
    "/images/gallery-skin.png",
    "/images/gallery-nails.png"
  ];
  return (
    <section id="gallery" className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-12">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          {images.map((src, i) => (
            <div key={i} className={`rounded-xl overflow-hidden shadow-sm group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={src} alt="Gallery image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif text-primary mb-6">Book Your Appointment</h2>
            <p className="text-muted-foreground mb-8">Ready for a transformation? Fill out the form below or reach out to us directly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <Phone className="w-6 h-6 text-secondary mb-3" />
                <h4 className="font-bold text-primary mb-1">Phone</h4>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
              </div>
              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <MapPin className="w-6 h-6 text-secondary mb-3" />
                <h4 className="font-bold text-primary mb-1">Location</h4>
                <p className="text-sm text-muted-foreground">123 Luxury Avenue, Metropolis</p>
              </div>
            </div>
            <div className="w-full h-64 rounded-xl overflow-hidden bg-muted">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.591299714822!3d12.971598790855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnMzYuNiJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy">
              </iframe>
            </div>
          </div>
          <div className="bg-card border border-border p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-serif text-primary mb-6">Reservation Form</h3>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Full Name</label>
                <Input placeholder="Enter your name" className="bg-background" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Mobile Number</label>
                  <Input placeholder="Enter number" className="bg-background" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Date</label>
                  <Input type="date" className="bg-background" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Select Service</label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridal">Bridal Makeup</SelectItem>
                    <SelectItem value="hair">Hair Styling & Spa</SelectItem>
                    <SelectItem value="skin">Skin Care & Facial</SelectItem>
                    <SelectItem value="other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-foreground">Additional Notes</label>
                <Textarea placeholder="Any specific requirements?" className="bg-background" rows={4} />
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Confirm Booking</Button>
                <Button size="lg" variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">Book via WhatsApp</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-serif text-center text-secondary mb-12">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-primary-foreground/20">
              <AccordionTrigger className="text-left text-lg hover:text-secondary">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-primary-foreground/80 text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary border-t border-primary-foreground/10 text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold text-secondary mb-4">Fair Look</h3>
            <p className="text-primary-foreground/70 mb-6">Premium luxury beauty parlour offering bespoke grooming and bridal services.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#about" className="hover:text-secondary">About Us</a></li>
              <li><a href="#services" className="hover:text-secondary">Services</a></li>
              <li><a href="#gallery" className="hover:text-secondary">Gallery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li><a href="#" className="hover:text-secondary">Bridal Makeovers</a></li>
              <li><a href="#" className="hover:text-secondary">Hair Styling</a></li>
              <li><a href="#" className="hover:text-secondary">Skin Treatments</a></li>
              <li><a href="#" className="hover:text-secondary">Beauty Training</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Business Hours</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>Mon - Sat: 10:00 AM - 8:00 PM</li>
              <li>Sunday: 11:00 AM - 6:00 PM</li>
              <li className="pt-4 font-medium text-secondary">Appointments Recommended</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
          <p>© 2024 Fair Look Beauty Parlour. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary">Privacy Policy</a>
            <a href="#" className="hover:text-secondary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 500);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}>
            <Button
              size="icon"
              className="rounded-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 w-12"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="icon"
          className="rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] bg-[#25D366] hover:bg-[#20bd5a] text-white h-16 w-16"
          onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Training />
        <Bridal />
        <Gallery />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
