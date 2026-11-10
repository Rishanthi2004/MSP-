import { Project, GalleryItem, Enquiry } from '../types';

export const initialProjects: Project[] = [
  {
    id: "the-reserve-coimbatore",
    slug: "the-reserve-coimbatore",
    name: "The Reserve by MSP",
    nameTa: "தி ரிசர்வ் - கோயம்புத்தூர்",
    tagline: "The Pinnacle of Gated Villa Living at Western Ghats Foothills",
    taglineTa: "மேற்குத் தொடர்ச்சி மலை அடிவாரத்தில் பிரீமியம் கேடட் வில்லா மனைச் சமஸ்தானம்",
    location: "Kovaipudur - Perur Sanctuary Corridor",
    locationTa: "கோவைப்புதூர் - பேரூர் வழித்தடம்",
    district: "Coimbatore",
    districtTa: "கோயம்புத்தூர்",
    category: "Gated Villa Plots",
    priceStarting: 36.8, // Lakhs
    pricePerSqft: 2450,
    plotSizes: "1,500 – 4,500 sq.ft (3.4 to 10.3 Cents)",
    plotSizesTa: "1,500 முதல் 4,500 சதுர அடி (3.4 முதல் 10.3 சென்ட்)",
    totalPlots: 48,
    availablePlots: 14,
    status: "Ready for Registration",
    statusTa: "பதிவுக்கு தயார்",
    approvals: [
      "DTCP Approval No: 88/2024 (R)",
      "TN RERA Reg: TN/11/Layout/2024/0119",
      "Nilgiris Biosphere Hill Area Clearance",
      "Immediate Individual E-Patta Sanctioned"
    ],
    heroImage: "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    gallery: [
      "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
      "/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
      "/assets/images/project_royal_palms_enclave_1794290582186.jpg",
    ],
    description: "Nestled against the lush verdant silhouettes of the Western Ghats, The Reserve by MSP spans 42 acres of pristine, fertile terrain. Crafted with 40-foot wide tree-lined boulevards, complete underground power conduits, and an exclusive clubhouse pavilion overlooking landscaped lake water bodies.",
    descriptionTa: "மேற்கு தொடர்ச்சி மலையின் பசுமையான பின்னணியில் 42 ஏக்கர் பரப்பளவில் அமைந்துள்ள 'தி ரிசர்வ்', தூய காற்று, நிலத்தடி மின்சார வசதிகள், 40 அடி அகல தார்ச்சாலைகள் மற்றும் இயற்கை ஏரி கொண்ட ஒரு கம்பீரமான சொகுசு குடியிருப்பு சொர்க்கம்.",
    amenities: [
      {
        icon: "ShieldCheck",
        name: "Triple-Tier Security",
        nameTa: "மூன்றடுக்கு பாதுகாப்பு",
        desc: "24/7 RFID gated access with AI perimeter analytics & biometric guard patrols.",
        descTa: "24/7 RFID நுழைவு வாயில் மற்றும் அதிநவீன சிசிடிவி கண்காணிப்பு."
      },
      {
        icon: "Zap",
        name: "Underground Infrastructure",
        nameTa: "நிலத்தடி கேபிள்கள்",
        desc: "100% concealed power grid, pneumatic optical internet ducts, and dual plumbing.",
        descTa: "முழுமையான நிலத்தடி மின் கம்பிகள் மற்றும் கண்ணாடி இழை இணைய வசதி."
      },
      {
        icon: "Trees",
        name: "Botanical Avenues",
        nameTa: "மரங்கள் சூழ்ந்த பசுமை சாலைகள்",
        desc: "Mature Royal Palms and flowering Tabebuia trees lining 40ft blacktop boulevards.",
        descTa: "40 அடி அகல சாலைகளின் இருபுறமும் குளிர் தரும் நிழல் மரங்கள்."
      },
      {
        icon: "Waves",
        name: "Private Lake & Promenade",
        nameTa: "இயற்கை ஏரி & நடைபாதை",
        desc: "Restored freshwater lake with wooden viewing pavilion and walking boardwalk.",
        descTa: "சுத்தமான நன்னீர் ஏரி, பார்வை மாடம் மற்றும் நடைபயிற்சி தளம்."
      }
    ],
    landmarks: [
      { name: "Coimbatore International Airport", nameTa: "கோவை சர்வதேச விமான நிலையம்", distance: "18.5 km", time: "28 mins" },
      { name: "Codissia Trade Center & IT Corridor", nameTa: "கொடிசியா & ஐடி காரிடார்", distance: "14.2 km", time: "22 mins" },
      { name: "The Camford & Delhi Public School", nameTa: "முன்னணி சர்வதேச பள்ளிகள்", distance: "4.8 km", time: "8 mins" },
      { name: "GKNM & KMCH Super Specialty Hospital", nameTa: "கேஎம்சிஹெச் மருத்துவமனை", distance: "12.0 km", time: "18 mins" },
    ],
    plots: [
      { id: 1, plotNo: "P-01", sizeSqft: 2400, cents: 5.5, facing: "East", status: "Available", price: "₹58.8 L" },
      { id: 2, plotNo: "P-02", sizeSqft: 2400, cents: 5.5, facing: "East", status: "Reserved", price: "₹58.8 L" },
      { id: 3, plotNo: "P-03", sizeSqft: 1800, cents: 4.1, facing: "North", status: "Available", price: "₹44.1 L" },
      { id: 4, plotNo: "P-04", sizeSqft: 1800, cents: 4.1, facing: "North", status: "Sold", price: "₹44.1 L" },
      { id: 5, plotNo: "P-05", sizeSqft: 3200, cents: 7.3, facing: "East", status: "Available", price: "₹78.4 L" },
      { id: 6, plotNo: "P-06", sizeSqft: 4500, cents: 10.3, facing: "North", status: "Available", price: "₹1.10 Cr" },
      { id: 7, plotNo: "P-07", sizeSqft: 2400, cents: 5.5, facing: "West", status: "Sold", price: "₹58.8 L" },
      { id: 8, plotNo: "P-08", sizeSqft: 2400, cents: 5.5, facing: "West", status: "Available", price: "₹58.8 L" },
      { id: 9, plotNo: "P-09", sizeSqft: 1500, cents: 3.4, facing: "East", status: "Available", price: "₹36.8 L" },
      { id: 10, plotNo: "P-10", sizeSqft: 1500, cents: 3.4, facing: "East", status: "Reserved", price: "₹36.8 L" },
      { id: 11, plotNo: "P-11", sizeSqft: 3000, cents: 6.9, facing: "North", status: "Available", price: "₹73.5 L" },
      { id: 12, plotNo: "P-12", sizeSqft: 3600, cents: 8.3, facing: "East", status: "Available", price: "₹88.2 L" },
    ],
    featured: true
  },
  {
    id: "the-grove-royal-palms",
    slug: "the-grove-royal-palms",
    name: "The Grove – Royal Palms",
    nameTa: "தி குரோவ் – ராயல் பாம்ஸ்",
    tagline: "Exclusive Highway Sanctuary on Avinashi Corridor",
    taglineTa: "அவிநாசி விரைவுச் சாலையில் பிரம்மாண்ட பனைமர சோலை மனைகள்",
    location: "Avinashi Road Express Corridor, Erode - Tirupur",
    locationTa: "அவிநாசி ரோடு, ஈரோடு - திருப்பூர்",
    district: "Erode / Tirupur",
    districtTa: "ஈரோடு / திருப்பூர்",
    category: "Gated Villa Plots",
    priceStarting: 22.2,
    pricePerSqft: 1850,
    plotSizes: "1,200 – 3,600 sq.ft (2.75 to 8.2 Cents)",
    plotSizesTa: "1,200 முதல் 3,600 சதுர அடி (2.75 முதல் 8.2 சென்ட்)",
    totalPlots: 56,
    availablePlots: 19,
    status: "Ready for Registration",
    statusTa: "பதிவுக்கு தயார்",
    approvals: [
      "DTCP Approved Layout No: 142/2023",
      "TN RERA Reg: TN/11/Layout/2023/0488",
      "Panchayat Union NOC & Clear Parent Deed",
      "Immediate Nationalised Bank Loan Approved"
    ],
    heroImage: "/assets/images/project_royal_palms_enclave_1794290582186.jpg",
    gallery: [
      "/assets/images/project_royal_palms_enclave_1794290582186.jpg",
      "/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
      "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    ],
    description: "Designed for discerning families seeking an oasis of tranquility with effortless connectivity. The Grove features grand stone masonry boundary walls, royal date palms, underground potable water grids, and paved pedestrian jogging trails.",
    descriptionTa: "அவிநாசி முக்கிய சாலையில் அமைந்துள்ள 'தி குரோவ்', நேர்த்தியான கல்வேலிகள், ராயல் பாம் பனைமரங்கள், தார்ச்சாலைகள் மற்றும் உடனடியாக வீடு கட்ட உகந்த சிறந்த கட்டமைப்பு கொண்டது.",
    amenities: [
      {
        icon: "Compass",
        name: "100% Vaastu Compliant",
        nameTa: "100% வாஸ்து வடிவமைப்பு",
        desc: "All plots demarcated in perfect East and North facing orientations.",
        descTa: "கிழக்கு மற்றும் வடக்கு நோக்கிய சிறந்த வாஸ்து மனைகள்."
      },
      {
        icon: "Lightbulb",
        name: "Solar Avenue Lighting",
        nameTa: "சோலார் விளக்குகள்",
        desc: "Automated dusk-to-dawn LED luminaires with backup battery storage.",
        descTa: "இரவு முழுவதும் ஒளிரும் நவீன சோலார் தெருவிளக்குகள்."
      },
      {
        icon: "Droplet",
        name: "24/7 Potable Water Grid",
        nameTa: "24 மணி நேர குடிநீர்",
        desc: "Overhead reservoir connected with individual plot water meters.",
        descTa: "தனித்தனி நீர் இணைப்புகளுடன் கூடிய பிரம்மாண்ட மேல்நிலைத் தொட்டி."
      },
      {
        icon: "Activity",
        name: "Fitness & Park Enclave",
        nameTa: "உடற்பயிற்சி பூங்கா",
        desc: "Dedicated yoga deck, children's safe play area, and outdoor gym.",
        descTa: "யோகா மேடை, சிறுவர் விளையாட்டு பூங்கா மற்றும் பசுமை நடைபாதை."
      }
    ],
    landmarks: [
      { name: "Avinashi Tollway Junction", nameTa: "அவிநாசி டோல்வே சந்திப்பு", distance: "2.1 km", time: "4 mins" },
      { name: "Tirupur Apparel & Railway Hub", nameTa: "திருப்பூர் ரயில் நிலையம்", distance: "14.5 km", time: "20 mins" },
      { name: "Erode Central Station", nameTa: "ஈரோடு சென்ட்ரல்", distance: "28.0 km", time: "35 mins" },
      { name: "Kovai International Airport", nameTa: "கோவை விமான நிலையம்", distance: "38.0 km", time: "42 mins" },
    ],
    plots: [
      { id: 21, plotNo: "G-01", sizeSqft: 1200, cents: 2.75, facing: "East", status: "Available", price: "₹22.2 L" },
      { id: 22, plotNo: "G-02", sizeSqft: 1500, cents: 3.44, facing: "East", status: "Available", price: "₹27.7 L" },
      { id: 23, plotNo: "G-03", sizeSqft: 2000, cents: 4.59, facing: "North", status: "Reserved", price: "₹37.0 L" },
      { id: 24, plotNo: "G-04", sizeSqft: 2400, cents: 5.51, facing: "East", status: "Available", price: "₹44.4 L" },
      { id: 25, plotNo: "G-05", sizeSqft: 3600, cents: 8.26, facing: "North", status: "Available", price: "₹66.6 L" },
      { id: 26, plotNo: "G-06", sizeSqft: 1800, cents: 4.13, facing: "West", status: "Sold", price: "₹33.3 L" },
      { id: 27, plotNo: "G-07", sizeSqft: 1500, cents: 3.44, facing: "East", status: "Available", price: "₹27.7 L" },
      { id: 28, plotNo: "G-08", sizeSqft: 1200, cents: 2.75, facing: "North", status: "Available", price: "₹22.2 L" },
    ],
    featured: true
  },
  {
    id: "serene-valley-nilgiris",
    slug: "serene-valley-nilgiris",
    name: "Serene Valley Estates",
    nameTa: "செரீன் வேலி - நீலகிரி எஸ்டேட்",
    tagline: "Ultra-Luxury Hill Villa Plots in the Misty Slopes of Kotagiri",
    taglineTa: "கோத்தகிரி பனிச்சாரல் மலை அடிவாரத்தில் பிரத்தியேக டீ எஸ்டேட் மனைகள்",
    location: "Mettupalayam - Kotagiri Foothills, The Nilgiris",
    locationTa: "மேட்டுப்பாளையம் - கோத்தகிரி, நீலகிரி",
    district: "The Nilgiris",
    districtTa: "நீலகிரி",
    category: "Hill Sanctuary",
    priceStarting: 135.0,
    pricePerSqft: 3100,
    plotSizes: "4,356 – 10,890 sq.ft (10 to 25 Cents)",
    plotSizesTa: "4,356 முதல் 10,890 சதுர அடி (10 முதல் 25 சென்ட்)",
    totalPlots: 22,
    availablePlots: 6,
    status: "Phase II Launch",
    statusTa: "இரண்டாம் கட்ட விற்பனை",
    approvals: [
      "Hill Area Conservation Authority (HACA) Cleared",
      "DTCP Sanctioned Layout No: 31/2024",
      "Forest & Environmental Buffer Clearance",
      "Private Mountain Access Road Certified"
    ],
    heroImage: "/assets/images/project_serene_valley_hills_1794290582457.jpg",
    gallery: [
      "/assets/images/project_serene_valley_hills_1794290582457.jpg",
      "/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
      "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    ],
    description: "Perched 2,400 feet above sea level with perpetual cool breezes, Serene Valley Estates provides limited-edition hill sanctuary plots. Bordered by manicured organic tea gardens and natural mountain streams, each plot offers breathtaking 180-degree valley vistas.",
    descriptionTa: "கடல் மட்டத்திலிருந்து 2,400 அடி உயரத்தில், எப்போதும் இதமான குளிர்ந்த காற்றுடன் தேயிலைத் தோட்டங்களின் நடுவே அமைந்துள்ள தனித்துவமான மலை வாழ்விட மனைகள். பிரமிக்க வைக்கும் இயற்கை அழகு மற்றும் நவீன வசதிகள்.",
    amenities: [
      {
        icon: "Mountain",
        name: "Panoramic Valley Views",
        nameTa: "பனோரமிக் மலைக் காட்சி",
        desc: "Unobstructed vistas of the mist-kissed Nilgiri mountain ridges.",
        descTa: "பனி படர்ந்த நீலகிரி மலை முகடுகளின் பிரம்மாண்ட காட்சி."
      },
      {
        icon: "Coffee",
        name: "Tea Garden Trails",
        nameTa: "தேயிலை தோட்ட நடைபாதை",
        desc: "Private walking trails weaving through aromatic Camellia Sinensis bushes.",
        descTa: "மணக்கும் தேயிலைத் தோட்டங்களின் வழியே அமைக்கப்பட்ட நடைபாதைகள்."
      },
      {
        icon: "ShieldAlert",
        name: "Reinforced Hill Terracing",
        nameTa: "வலுவான கல் தடுப்பு சுவர்கள்",
        desc: "Engineered stone gabion retaining walls and subsurface contour drainage.",
        descTa: "நிலச்சரிவு பாதுகாப்பு கொண்ட பலமான கல் சுவர்கள் மற்றும் வடிகால்கள்."
      },
      {
        icon: "Compass",
        name: "Helipad Access Facility",
        nameTa: "ஹெலிபேட் வசதி",
        desc: "Co-located helipad access for swift private executive transfers.",
        descTa: "அவசர மற்றும் பிரத்தியேக பயன்பாட்டிற்கான ஹெலிபேட் வசதி."
      }
    ],
    landmarks: [
      { name: "Kotagiri Town Square", nameTa: "கோத்தகிரி நகரம்", distance: "12.0 km", time: "25 mins" },
      { name: "Ooty Botanical Gardens", nameTa: "ஊட்டி தாவரவியல் பூங்கா", distance: "29.0 km", time: "45 mins" },
      { name: "Mettupalayam Railway Junction", nameTa: "மேட்டுப்பாளையம் ரயில் நிலையம்", distance: "16.0 km", time: "22 mins" },
      { name: "Coimbatore Airport", nameTa: "கோவை விமான நிலையம்", distance: "45.0 km", time: "65 mins" },
    ],
    plots: [
      { id: 41, plotNo: "SV-01", sizeSqft: 4356, cents: 10.0, facing: "East", status: "Available", price: "₹1.35 Cr" },
      { id: 42, plotNo: "SV-02", sizeSqft: 6534, cents: 15.0, facing: "North", status: "Reserved", price: "₹2.02 Cr" },
      { id: 43, plotNo: "SV-03", sizeSqft: 8712, cents: 20.0, facing: "East", status: "Available", price: "₹2.70 Cr" },
      { id: 44, plotNo: "SV-04", sizeSqft: 10890, cents: 25.0, facing: "North", status: "Available", price: "₹3.37 Cr" },
    ],
    featured: true
  },
  {
    id: "serenity-shores-lakefront",
    slug: "serenity-shores-lakefront",
    name: "Serenity Shores",
    nameTa: "செரினிட்டி ஷோர்ஸ் - ஏரிக்கரை மனைகள்",
    tagline: "Rare Waterfront Residential Plots with Private Boardwalk",
    taglineTa: "அழகிய ஏரிக்கரையில் அமைதியான நீர்நிலை சொகுசு குடியிருப்பு மனைகள்",
    location: "Sulur Lake Promenade, Coimbatore East",
    locationTa: "சூலூர் ஏரிக்கரை, கோயம்புத்தூர் கிழக்கு",
    district: "Coimbatore",
    districtTa: "கோயம்புத்தூர்",
    category: "Lakefront Retreat",
    priceStarting: 56.0,
    pricePerSqft: 2800,
    plotSizes: "2,000 – 5,000 sq.ft (4.6 to 11.5 Cents)",
    plotSizesTa: "2,000 முதல் 5,000 சதுர அடி (4.6 முதல் 11.5 சென்ட்)",
    totalPlots: 32,
    availablePlots: 8,
    status: "Ready for Registration",
    statusTa: "பதிவுக்கு தயார்",
    approvals: [
      "DTCP Approval No: 204/2024",
      "TN RERA Reg: TN/11/Layout/2024/0302",
      "PWD Water Resources Dept. NOC",
      "High Flood Level (HFL) Certified Safe"
    ],
    heroImage: "/assets/images/project_emerald_waters_lake_1794290583005.jpg",
    gallery: [
      "/assets/images/project_emerald_waters_lake_1794290583005.jpg",
      "/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
      "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    ],
    description: "An ultra-exclusive collection of lakefront residential plots commanding uninterrupted vistas across calm azure waters. Featuring an engineered timber promenade, sunset viewing deck, and water-themed landscaped recreation zones.",
    descriptionTa: "அமைதியான நீல நிற ஏரியின் முகப்பில் அமைந்துள்ள அரிய சொகுசு வீட்டு மனைகள். பிரத்தியேக மரத்தாலான ஏரிக்கரை நடைபாதை, சூரிய அஸ்தமன தளம் மற்றும் இயற்கை எழில் கொஞ்சும் பூங்காக்கள் கொண்டது.",
    amenities: [
      {
        icon: "Anchor",
        name: "Private Lake Promenade",
        nameTa: "பிரத்தியேக ஏரிக்கரை தளம்",
        desc: "Teakwood deck for peaceful morning meditation and evening stargazing.",
        descTa: "காலை தியானம் மற்றும் மாலை ஓய்விற்கான அமைதியான ஏரிக்கரை தளம்."
      },
      {
        icon: "Sun",
        name: "Sunset Gazebo Pavilion",
        nameTa: "சூரிய அஸ்தமன பார்வை மாடம்",
        desc: "Architect-designed shaded pavilion extending directly toward the waterline.",
        descTa: "ஏரியை நோக்கி அமைந்துள்ள அழகிய நிழல் ஓய்வு மாடம்."
      },
      {
        icon: "ShieldCheck",
        name: "Bio-Swale & Stormwater Canal",
        nameTa: "நவீன மழைநீர் வடிகால்",
        desc: "Nature-based zero-waterlogging engineering with subsoil bio-filters.",
        descTa: "மழைநீர் தேங்காத சர்வதேச தரத்திலான பயோ-ஸ்வேல் வடிகால் கட்டமைப்பு."
      },
      {
        icon: "Sparkles",
        name: "Clubhouse with Infinity Lounge",
        nameTa: "கிளப்ஹவுஸ் மற்றும் லவுஞ்ச்",
        desc: "Indoor games, banquet verandah, and private coffee bistro.",
        descTa: "விளையாட்டு அரங்கம், விருந்தினர் தளம் மற்றும் காபி உணவகம்."
      }
    ],
    landmarks: [
      { name: "Trichy - Coimbatore Express Highway", nameTa: "திருச்சி - கோவை எக்ஸ்பிரஸ் சாலை", distance: "1.8 km", time: "3 mins" },
      { name: "Sulur Air Base Station", nameTa: "சூலூர் ஏர் பேஸ்", distance: "4.5 km", time: "7 mins" },
      { name: "Singanallur Commercial Hub", nameTa: "சிங்காநல்லூர்", distance: "9.2 km", time: "14 mins" },
      { name: "Coimbatore International Airport", nameTa: "கோவை விமான நிலையம்", distance: "13.0 km", time: "18 mins" },
    ],
    plots: [
      { id: 61, plotNo: "SS-01", sizeSqft: 2000, cents: 4.59, facing: "East", status: "Available", price: "₹56.0 L" },
      { id: 62, plotNo: "SS-02", sizeSqft: 2500, cents: 5.74, facing: "North", status: "Available", price: "₹70.0 L" },
      { id: 63, plotNo: "SS-03", sizeSqft: 3200, cents: 7.35, facing: "East", status: "Reserved", price: "₹89.6 L" },
      { id: 64, plotNo: "SS-04", sizeSqft: 5000, cents: 11.48, facing: "North", status: "Available", price: "₹1.40 Cr" },
    ],
    featured: true
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "g1",
    title: "The Master Aerial - The Reserve",
    titleTa: "தி ரிசர்வ் - பிரம்மாண்ட வான்வழி பார்வை",
    category: "Aerials",
    image: "/assets/images/hero_luxury_residential_estate_1794290580559.jpg",
    caption: "A bird's eye view over 42 acres of master-planned layout infrastructure and lakefront enclaves.",
    captionTa: "42 ஏக்கர் பரப்பளவிலான முழுமையான உள்கட்டமைப்பு மற்றும் ஏரிக்கரை மனைகளின் வான்வழி காட்சி."
  },
  {
    id: "g2",
    title: "Monumental Travertine Entrance Arch",
    titleTa: "கம்பீரமான பிரதான நுழைவு வளைவு",
    category: "Grand Entrances",
    image: "/assets/images/gallery_grand_arch_entrance_1794290582969.jpg",
    caption: "Dual vehicular gateways flanked by natural water cascades and automated RFID booms.",
    captionTa: "இயற்கை நீரூற்று மற்றும் தானியங்கி பாதுகாப்பு கேட்கள் கொண்ட பிரமாண்ட நுழைவு வளைவு."
  },
  {
    id: "g3",
    title: "40ft Royal Palm Boulevard",
    titleTa: "40 அடி பனைமர பசுமை நெடுஞ்சாலை",
    category: "Avenues & Roads",
    image: "/assets/images/project_royal_palms_enclave_1794290582186.jpg",
    caption: "Heavy-duty blacktop roads lined with curbside flora and underground electrical ducts.",
    captionTa: "இருபுறமும் மலர் மரங்கள் மற்றும் நிலத்தடி மின்சார வசதிகளுடன் கூடிய அகன்ற தார்ச்சாலைகள்."
  },
  {
    id: "g4",
    title: "Misty Foothills of Serene Valley",
    titleTa: "செரீன் வேலி - பனி படர்ந்த மலை முகடுகள்",
    category: "Landscapes",
    image: "/assets/images/project_serene_valley_hills_1794290582457.jpg",
    caption: "Tiered villa plots carved into gentle tea garden slopes with certified stone contour terracing.",
    captionTa: "தேயிலைத் தோட்டங்களின் நடுவே அமைக்கப்பட்ட தனித்துவமான மலை வாழ்விட மனைகள்."
  },
  {
    id: "g5",
    title: "Lakefront Sunset Boardwalk",
    titleTa: "ஏரிக்கரை மாலை பார்வை தளம்",
    category: "Landscapes",
    image: "/assets/images/project_emerald_waters_lake_1794290583005.jpg",
    caption: "Peaceful waterfront pavilion reserved exclusively for residents of Serenity Shores.",
    captionTa: "செரினிட்டி ஷோர்ஸ் குடியிருப்பாளர்களுக்கான அமைதியான ஏரிக்கரை மாலை நடைபாதை."
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: "ENQ-901",
    createdAt: "2026-11-08 14:30",
    name: "Dr. K. Senthil Nathan",
    phone: "+91 98422 15890",
    email: "senthil.nathan@cardio-care.org",
    projectId: "the-reserve-coimbatore",
    projectName: "The Reserve by MSP",
    visitDate: "2026-11-14",
    timeSlot: "Morning (09:30 AM - 12:30 PM)",
    pickUpNeeded: true,
    message: "Interested in East-facing 5.5 Cent plot (P-01). Require airport chauffeur pick-up.",
    status: "Scheduled"
  },
  {
    id: "ENQ-902",
    createdAt: "2026-11-09 10:15",
    name: "Mrs. Meenakshi Sundaram",
    phone: "+91 94433 87120",
    email: "meenakshi.s@techconsult.in",
    projectId: "serenity-shores-lakefront",
    projectName: "Serenity Shores",
    visitDate: "2026-11-16",
    timeSlot: "Afternoon (02:00 PM - 05:30 PM)",
    pickUpNeeded: false,
    message: "Seeking lake-facing plot options for immediate independent villa construction.",
    status: "New"
  },
  {
    id: "ENQ-903",
    createdAt: "2026-11-09 17:45",
    name: "Rajesh Kumar (NRI Singapore)",
    phone: "+65 9123 4567",
    email: "rajesh.sg@investcorp.com",
    projectId: "serene-valley-nilgiris",
    projectName: "Serene Valley Estates",
    visitDate: "2026-11-20",
    timeSlot: "Morning (09:30 AM - 12:30 PM)",
    pickUpNeeded: true,
    message: "Looking for 15-20 cent vacation villa plot. Please share full DTCP/HACA documents.",
    status: "Contacted"
  }
];
