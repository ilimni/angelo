/**
 * ILIMNI — Digital Literacy & Computing Foundations Review Experience
 * Missions 001 & 002 | Learner: Angelo (JSS3)
 *
 * This is a REVIEW, not an exam. Every interaction exists because it either
 * reinforces a concept Angelo has already met in class, or targets a
 * misconception JSS3 learners commonly carry (e.g. the .com/file-extension mix-up).
 * Items that were pure recall filler were deliberately left out — see the
 * note at the bottom of this file for what got cut and why.
 */

const missionContent = [

  // ============================================================
  // MISSION 1 — SECTION 1: What is a Computer?
  // ============================================================
  {
    id: "m1-s1-01",
    mission: 1,
    section: "What is a Computer?",
    title: "The Four-Step Machine",
    type: "ordering",
    difficulty: "easy",
    question: "Put these four things a computer does in the correct order.",
    options: ["Processes data", "Accepts data (Input)", "Stores data", "Gives out information (Output)"],
    correctAnswer: ["Accepts data (Input)", "Processes data", "Stores data", "Gives out information (Output)"],
    explanation: "A computer is an electronic device that follows this cycle: it first ACCEPTS data from you, then PROCESSES it (works on it), then it can STORE it for later, and finally it gives OUTPUT — the result you can see, hear or use. Skipping input means there's nothing to process; skipping output means the work never reaches you.",
    funFact: "The word 'computer' used to mean a PERSON whose job was to compute (calculate) numbers by hand — long before machines took over the job!",
    realWorldExample: "When you type 2+2 into a calculator app, that's input. The calculator working it out is processing. Seeing '4' on the screen is output.",
    xp: 10,
    hint: "Think: something has to go IN before the machine can work, and work has to happen before anything comes OUT."
  },
  {
    id: "m1-s1-02",
    mission: 1,
    section: "What is a Computer?",
    title: "Data vs Information",
    type: "mcq",
    difficulty: "medium",
    question: "Angelo's teacher wrote the numbers 78, 85, 91, 60 on the board — these are test scores with no names attached. What are these numbers, on their own?",
    options: ["Information, because they are numbers", "Data, because they have no meaning attached yet", "Output, because the teacher wrote them", "Software"],
    correctAnswer: "Data, because they have no meaning attached yet",
    explanation: "Raw numbers with nothing to explain them are DATA — unprocessed facts. The moment you attach meaning — 'Angelo scored 91' — it becomes INFORMATION. A common mix-up is thinking any number is automatically 'information'; it isn't, until it's organised and given context.",
    funFact: "A single email you receive is information, but the millions of 1s and 0s that travel through the internet to deliver it are just data until your phone assembles them.",
    realWorldExample: "A shopping receipt full of prices is data. A sentence like 'You spent ₦4,500 on snacks this week' is information — because it's been processed and given meaning.",
    xp: 15,
    hint: "Ask yourself: does this tell you something on its own, or does it need to be organised first?"
  },
  {
    id: "m1-s1-03",
    mission: 1,
    section: "What is a Computer?",
    title: "Is It a Computer?",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these into 'Computer' and 'Not a Computer': Smartphone, Wristwatch (non-smart), Smart TV, Calculator, Radio, ATM machine.",
    options: ["Smartphone", "Wristwatch (non-smart)", "Smart TV", "Calculator", "Radio", "ATM machine"],
    correctAnswer: {
      "Computer": ["Smartphone", "Smart TV", "Calculator", "ATM machine"],
      "Not a Computer": ["Wristwatch (non-smart)", "Radio"]
    },
    explanation: "Anything that accepts data, processes it, and produces output counts as a computer — even if it doesn't look like the desktop in your ICT lab. A basic calculator qualifies! But a plain wristwatch or an old radio only DISPLAYS or PLAYS a signal — it doesn't process data based on your input the way a computer does.",
    funFact: "Modern cars can have over 100 tiny computers inside them controlling things like brakes and music — you're riding inside a computer network every day!",
    realWorldExample: "An ATM accepts your card and PIN (input), checks your balance (processing), and gives you cash and a receipt (output) — that's a full computer cycle.",
    xp: 15,
    hint: "Does it just play a fixed signal, or does it actually DO something with the data you give it?"
  },
  {
    id: "m1-s1-04",
    mission: 1,
    section: "What is a Computer?",
    title: "Reflection: Data and Information",
    type: "reflection",
    difficulty: "easy",
    question: "In your own words, explain the difference between data and information. Give one example from your own life.",
    options: null,
    correctAnswer: null,
    explanation: "There's no single 'correct' wording here — what matters is that your example shows raw, unorganised facts turning into something meaningful once it's processed.",
    funFact: "Even this app is an example: your answers (data) get turned into your progress score (information)!",
    realWorldExample: "Your class attendance register is data. 'Angelo has been present 18 out of 20 days this term' is information.",
    xp: 10,
    hint: "Try finishing this sentence: 'Data becomes information when...'"
  },

  // ============================================================
  // MISSION 1 — SECTION 2: Input
  // ============================================================
  {
    id: "m1-s2-01",
    mission: 1,
    section: "Input",
    title: "Match the Device to the Job",
    type: "matching",
    difficulty: "easy",
    question: "Match each input device to what it is mainly used for.",
    options: [
      { device: "Scanner", use: "Copying a printed photo into the computer" },
      { device: "Microphone", use: "Recording your voice" },
      { device: "Barcode reader", use: "Reading product prices at a shop" },
      { device: "Fingerprint scanner", use: "Unlocking a phone with your finger" },
      { device: "Joystick", use: "Controlling movement in a game" }
    ],
    correctAnswer: "device-use pairs as listed",
    explanation: "Every input device exists to turn something from the real world — sound, an image, a fingerprint, a movement — into data the computer can use. A scanner and a camera can seem similar, but a scanner is built for flat documents/photos, while a camera captures a live scene.",
    funFact: "Barcode readers use a laser or a camera to read the black-and-white lines, which actually encode numbers — not pictures!",
    realWorldExample: "When a shop attendant beeps your biscuit pack at checkout, that beep sound means the barcode reader has successfully sent data (the product code) to the till computer.",
    xp: 15,
    hint: "Think about what real-world thing each device is designed to 'capture'."
  },
  {
    id: "m1-s2-02",
    mission: 1,
    section: "Input",
    title: "Odd One Out",
    type: "mcq",
    difficulty: "medium",
    question: "Which of these is NOT an input device?",
    options: ["Keyboard", "Projector", "Touchscreen", "Mouse"],
    correctAnswer: "Projector",
    explanation: "A projector sends light OUT to display images on a screen — that makes it an output device, not input. It's easy to confuse because it 'shows' something, but showing is output; the touchscreen, however, IS an input device too — because when you tap it, you're sending data to the computer, even though the same screen also shows output.",
    funFact: "A touchscreen is actually two devices in one: an input device (when you tap it) and part of the output system (when it displays images) — that's why it can confuse people!",
    realWorldExample: "In a cinema, the projector is pure output — throwing the movie onto the screen. Nobody 'inputs' anything through it.",
    xp: 15,
    hint: "Ask: does this device send information INTO the computer, or does it send information OUT to you?"
  },
  {
    id: "m1-s2-03",
    mission: 1,
    section: "Input",
    title: "Drag the Right Device",
    type: "drag-drop",
    difficulty: "easy",
    question: "Angelo wants to unlock his uncle's phone using his fingerprint. Drag the correct input device into the blank: 'The phone uses a ___ to check his fingerprint.'",
    options: ["Fingerprint scanner", "Barcode reader", "Joystick", "Speaker"],
    correctAnswer: "Fingerprint scanner",
    explanation: "A fingerprint scanner reads the unique pattern of ridges on a finger and turns it into data the phone can compare against a stored copy. Speakers and barcode readers have completely different jobs — one is output-only, the other reads printed codes, not skin patterns.",
    funFact: "No two people — not even identical twins — have exactly the same fingerprints.",
    realWorldExample: "Many banks in Nigeria now use fingerprint or facial scanning at ATMs and on banking apps for extra security (this is called biometric verification).",
    xp: 10,
    hint: "The clue is in the question — what part of the body is being checked?"
  },
  {
    id: "m1-s2-04",
    mission: 1,
    section: "Input",
    title: "True or False: Touchscreens",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: A touchscreen can be both an input device and part of the output system at the same time.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "This is true. When you tap a touchscreen, you are giving input. When it displays icons, videos or text, it is acting as output. Most learners assume a device can only be one or the other — but a touchscreen genuinely does both jobs at once.",
    funFact: "The first touchscreen phone ever sold to the public was the IBM Simon in 1994 — over a decade before the first iPhone!",
    realWorldExample: "When you scroll and tap your phone screen to open WhatsApp, that's input. The chat messages that appear are output — all on the same screen.",
    xp: 15,
    hint: "Think about what happens the moment you TAP a screen, versus what happens when it just SHOWS you something."
  },
  {
    id: "m1-s2-05",
    mission: 1,
    section: "Input",
    title: "Scenario: The Silent Microphone",
    type: "scenario",
    difficulty: "medium",
    question: "Angelo is trying to record a voice note but the app shows no sound is being picked up. Which device should he check first?",
    options: ["Monitor", "Microphone", "Printer", "Mouse"],
    correctAnswer: "Microphone",
    explanation: "Recording sound is entirely the microphone's job — it converts sound waves into data. A monitor and printer are output devices and have nothing to do with capturing sound, and a mouse handles pointing/clicking, not audio.",
    funFact: "Microphones work using a thin part called a diaphragm that vibrates when sound waves hit it — just like your eardrum!",
    realWorldExample: "During online classes, if your teacher can't hear you speak, the first thing to check is always the microphone — either it's muted, blocked, or not connected.",
    xp: 15,
    hint: "Which device's whole job is turning sound into data?"
  },
  {
    id: "m1-s2-06",
    mission: 1,
    section: "Input",
    title: "Click the Correct Input Devices",
    type: "hotspot",
    difficulty: "easy",
    question: "Look at a picture of a computer desk with a keyboard, monitor, mouse, and speakers. Click ONLY the input devices.",
    options: ["Keyboard", "Monitor", "Mouse", "Speakers"],
    correctAnswer: ["Keyboard", "Mouse"],
    explanation: "The keyboard and mouse both send YOUR actions (typing, clicking, moving) into the computer, making them input devices. The monitor shows you the result (output) and the speakers play sound (also output) — nothing you do to them sends data into the computer.",
    funFact: "Before the mouse became popular in the 1980s, people controlled early computers using only the keyboard — imagine designing a picture with no mouse!",
    realWorldExample: "In a cybercafé, you'll always find a keyboard and mouse per seat because both are needed for input — but one monitor and sometimes shared speakers are enough for output.",
    xp: 10,
    hint: "Input devices are the ones YOU actively control to send information in."
  },

  // ============================================================
  // MISSION 1 — SECTION 3: Processing
  // ============================================================
  {
    id: "m1-s3-01",
    mission: 1,
    section: "Processing",
    title: "Do It By Hand First",
    type: "fill-blank",
    difficulty: "medium",
    question: "Here are four numbers: 40, 50, 60, 80. How many numbers are there, and what is their sum? (Answer format: count, sum)",
    options: null,
    correctAnswer: "4, 230",
    explanation: "Counting: 40, 50, 60, 80 — that's 4 numbers. Adding them: 40+50=90, 90+60=150, 150+80=230. You just did what a CPU does when it processes data — except a CPU would do this same calculation in a tiny fraction of a second, and it wouldn't get tired doing it a million times in a row.",
    funFact: "A basic modern CPU can perform billions of calculations every second — doing what you just did over a billion times before you could blink.",
    realWorldExample: "When your school calculates the average of everyone's exam scores, a spreadsheet program is doing thousands of tiny additions and divisions instantly — the same kind of work you just did by hand.",
    xp: 15,
    hint: "Count the numbers one by one, then add them together step by step."
  },
  {
    id: "m1-s3-02",
    mission: 1,
    section: "Processing",
    title: "Find the Average",
    type: "fill-blank",
    difficulty: "medium",
    question: "Using the same numbers (40, 50, 60, 80), what is their average?",
    options: null,
    correctAnswer: "57.5",
    explanation: "Average = sum ÷ count = 230 ÷ 4 = 57.5. This two-step process (add, then divide) is exactly the kind of repetitive logical task the CPU is built for — it's simple in idea but tiring by hand if you had 400 numbers instead of 4.",
    funFact: "If you had to average 1,000 exam scores by hand, it could take you hours. A computer does it in under a second.",
    realWorldExample: "Your school report card's 'average score' or 'GPA' is calculated this exact way, just with more numbers.",
    xp: 15,
    hint: "You already found the sum. Now divide it by how many numbers you counted."
  },
  {
    id: "m1-s3-03",
    mission: 1,
    section: "Processing",
    title: "Why Is the CPU Called the Brain?",
    type: "mcq",
    difficulty: "medium",
    question: "Why do we call the CPU the 'brain' of the computer?",
    options: [
      "Because it is shaped like a brain",
      "Because it makes decisions and carries out instructions for the whole system",
      "Because it stores all the files permanently",
      "Because it displays pictures on the screen"
    ],
    correctAnswer: "Because it makes decisions and carries out instructions for the whole system",
    explanation: "The CPU (Central Processing Unit) is where calculations happen and decisions are executed — similar to how your brain processes what your senses send it and decides what to do. It doesn't store files long-term (that's storage's job) and it doesn't display images itself (that's the graphics/output system).",
    funFact: "The CPU is sometimes smaller than a matchbox, yet it can carry out billions of instructions every second.",
    realWorldExample: "When you open a game and it responds instantly to your button press, the CPU is the one deciding what should happen next, extremely fast.",
    xp: 15,
    hint: "Think about what a brain actually DOES in your body — deciding and controlling, not storing memories forever like a diary."
  },
  {
    id: "m1-s3-04",
    mission: 1,
    section: "Processing",
    title: "Reflection: Human vs Computer Speed",
    type: "reflection",
    difficulty: "easy",
    question: "You just averaged 4 numbers by hand. Why do you think computers can do this so much faster than humans?",
    options: null,
    correctAnswer: null,
    explanation: "There's no single right answer, but a strong reflection usually mentions that computers don't get tired, don't make small arithmetic mistakes, and can repeat the same steps millions of times per second using electrical signals instead of thinking things through like a person does.",
    funFact: "Early computers in the 1940s were the size of a full room and were STILL faster at maths than any human — even though they were far slower than today's phones.",
    realWorldExample: "Weather forecasters use computers to process millions of temperature and wind readings — a task no team of humans could finish before the weather itself changed.",
    xp: 10,
    hint: "Think about tiredness, mistakes, and how many times a computer can repeat a step in one second."
  },

  // ============================================================
  // MISSION 1 — SECTION 4: Storage
  // ============================================================
  {
    id: "m1-s4-01",
    mission: 1,
    section: "Storage",
    title: "Temporary or Permanent?",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these into 'Temporary Storage' and 'Permanent Storage': RAM, Hard Disk, SSD, ROM.",
    options: ["RAM", "Hard Disk", "SSD", "ROM"],
    correctAnswer: {
      "Temporary Storage": ["RAM"],
      "Permanent Storage": ["Hard Disk", "SSD", "ROM"]
    },
    explanation: "RAM (Random Access Memory) only holds data while the computer is switched on — it's cleared the moment you turn the power off, which is why it's temporary. Hard disks, SSDs, and ROM all keep their data even after power is off, making them permanent. A common mistake is grouping ROM with RAM just because the names look alike — but they behave almost oppositely.",
    funFact: "'RAM' and 'ROM' sound alike but ROM (Read Only Memory) usually can't be changed by the user at all — it stores fixed instructions like startup information.",
    realWorldExample: "If your phone freezes and you restart it, unsaved work in an app (which lived in RAM) disappears — but your saved photos (on permanent storage) are still there.",
    xp: 15,
    hint: "Ask: does this keep its data after the power goes off, or does it lose everything?"
  },
  {
    id: "m1-s4-02",
    mission: 1,
    section: "Storage",
    title: "RAM vs ROM",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: RAM stands for 'Read Only Memory'.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "RAM stands for Random Access Memory, not Read Only Memory. ROM is the one that stands for Read Only Memory. This is one of the most common mix-ups in computer basics because the two names are so similar in shape but describe very different jobs.",
    funFact: "'Random Access' means the CPU can jump straight to any piece of data in RAM instantly, instead of reading through it in order — which is a big part of why RAM is so fast.",
    realWorldExample: "When your phone says 'low on RAM, please close some apps,' it means the temporary working space is getting full — not your photo storage.",
    xp: 15,
    hint: "One of these two has 'Random' in its full name, and one has 'Read Only.'"
  },
  {
    id: "m1-s4-03",
    mission: 1,
    section: "Storage",
    title: "SSD vs Hard Disk",
    type: "mcq",
    difficulty: "hard",
    question: "What is the main advantage of an SSD (Solid State Drive) over a traditional Hard Disk?",
    options: [
      "SSDs are always bigger in storage size",
      "SSDs have no moving parts, so they are faster and more durable",
      "SSDs can only store pictures, not documents",
      "SSDs need no electricity to work"
    ],
    correctAnswer: "SSDs have no moving parts, so they are faster and more durable",
    explanation: "A traditional hard disk stores data on a spinning magnetic disk with a moving arm — like a tiny record player — which can be slower and is at risk if the computer is shaken or dropped. An SSD uses electronic chips with no moving parts, making it faster to read/write and tougher against physical shock.",
    funFact: "Because SSDs have no moving parts, they also run silently — no clicking or spinning sounds like older hard disks make.",
    realWorldExample: "Laptops with SSDs usually boot up (start) in seconds, while older laptops with hard disks can take over a minute to fully load.",
    xp: 20,
    hint: "Think about what's physically moving inside a hard disk, and what that means if the laptop gets bumped."
  },
  {
    id: "m1-s4-04",
    mission: 1,
    section: "Storage",
    title: "Everyday Analogy",
    type: "matching",
    difficulty: "easy",
    question: "Match each storage type to its everyday analogy.",
    options: [
      { term: "RAM", analogy: "Your desk while you're working — cleared when you leave" },
      { term: "Hard Disk / SSD", analogy: "Your locker or bag — keeps things even after you leave" },
      { term: "ROM", analogy: "A printed instruction manual glued into the machine, fixed and rarely changed" }
    ],
    correctAnswer: "term-analogy pairs as listed",
    explanation: "These analogies map directly onto real behaviour: your desk gets cleared at the end of the day (like RAM losing data on shutdown), your locker keeps items long-term (like permanent storage), and a fixed manual represents information that's built in and not meant to be edited by the user (like ROM).",
    funFact: "Analogies like this are used by real computer science teachers worldwide — because storage concepts click faster with a physical comparison.",
    realWorldExample: "Think about closing all your exercise books at the end of class (RAM clearing) versus keeping your class notebooks in your school bag for the rest of the term (permanent storage).",
    xp: 15,
    hint: "Which of these three things gets 'cleared' the soonest in real life?"
  },
  {
    id: "m1-s4-05",
    mission: 1,
    section: "Storage",
    title: "Guess Before You Reveal",
    type: "guess-reveal",
    difficulty: "medium",
    question: "Before revealing the answer: which do you think is generally FASTER — RAM or an SSD?",
    options: ["RAM", "SSD"],
    correctAnswer: "RAM",
    explanation: "RAM is faster than even an SSD, but it can't hold data permanently — that's the trade-off. This is why computers use BOTH: RAM for lightning-fast temporary work, and SSD/Hard Disk for keeping things safe long-term.",
    funFact: "RAM is so fast it's measured in nanoseconds for access time, while even a fast SSD is measured in microseconds — RAM can be roughly 100 times faster.",
    realWorldExample: "When you have many browser tabs open and everything still runs smoothly, that's RAM doing the heavy lifting in the background.",
    xp: 15,
    hint: "Speed and permanence are usually a trade-off in computing — the fastest storage rarely keeps data forever."
  },
  {
    id: "m1-s4-06",
    mission: 1,
    section: "Storage",
    title: "Reflection: Choosing Storage",
    type: "reflection",
    difficulty: "easy",
    question: "If you were designing a new laptop and had to choose only ONE type of permanent storage (Hard Disk or SSD) to include, which would you pick and why?",
    options: null,
    correctAnswer: null,
    explanation: "Either answer can be 'correct' as long as the reasoning holds up — SSD for speed and durability, or Hard Disk if the reasoning focuses on getting more storage space for a lower cost, which is often still true today.",
    funFact: "Some laptops now use BOTH — a small fast SSD for the operating system, and a larger hard disk for bulk storage like movies and photos.",
    realWorldExample: "Budget laptops sold in many Nigerian markets often still use hard disks to keep the price lower, while premium laptops use SSDs for speed.",
    xp: 10,
    hint: "Think about what matters most to you: raw speed, or getting the most storage space for less money."
  },

  // ============================================================
  // MISSION 1 — SECTION 5: Output
  // ============================================================
  {
    id: "m1-s5-01",
    mission: 1,
    section: "Output",
    title: "Identify the Output Device",
    type: "image-id",
    difficulty: "easy",
    question: "Look at the picture: a device that produces a printed paper copy of a document. What is this device called?",
    options: ["Scanner", "Printer", "Projector", "Monitor"],
    correctAnswer: "Printer",
    explanation: "A printer takes digital information and turns it into a physical, paper copy — that's output. A scanner does the opposite job: it takes a physical document and turns it into digital data (input).",
    funFact: "The first computer printers in the 1950s and 60s were as loud and large as small cars — today's printers fit on a desk.",
    realWorldExample: "When your school prints out exam result slips, the printer is converting digital records into paper you can hold.",
    xp: 10,
    hint: "This device produces paper, not digital files."
  },
  {
    id: "m1-s5-02",
    mission: 1,
    section: "Output",
    title: "Scenario: The Silent Classroom",
    type: "scenario",
    difficulty: "medium",
    question: "During an online class, Angelo can see his teacher's video but can't hear anything. Which output device should he check?",
    options: ["Keyboard", "Speaker/Headphones", "Scanner", "Mouse"],
    correctAnswer: "Speaker/Headphones",
    explanation: "Sound coming out of the computer is entirely the job of speakers or headphones — both output devices. Keyboard and mouse are input devices and have no connection to sound output, and a scanner is unrelated entirely.",
    funFact: "Headphones and speakers work using the same basic idea — a small magnet vibrating to push air and create sound — just at different sizes.",
    realWorldExample: "If a call sounds silent on your phone, checking the speaker or whether headphones are still 'connected' in settings is usually the first fix.",
    xp: 15,
    hint: "Which devices are built specifically to let you hear sound from the computer?"
  },
  {
    id: "m1-s5-03",
    mission: 1,
    section: "Output",
    title: "Input or Output?",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these into Input and Output: Monitor, Microphone, Projector, Scanner, Speaker, Keyboard.",
    options: ["Monitor", "Microphone", "Projector", "Scanner", "Speaker", "Keyboard"],
    correctAnswer: {
      "Input": ["Microphone", "Scanner", "Keyboard"],
      "Output": ["Monitor", "Projector", "Speaker"]
    },
    explanation: "Devices that send YOUR data or actions into the computer are input (microphone, scanner, keyboard). Devices that give results back to you are output (monitor, projector, speaker). Grouping them this way is the fastest way to stop confusing the two categories.",
    funFact: "Some devices, like touchscreens or smart glasses, don't fit neatly into just one category — they can do both jobs.",
    realWorldExample: "A school computer lab typically has one keyboard/mouse/microphone set per student (input) but might share one big projector (output) for the whole class.",
    xp: 15,
    hint: "Ask of each device: does it send data IN, or does it show/play something OUT?"
  },
  {
    id: "m1-s5-04",
    mission: 1,
    section: "Output",
    title: "Reflection: A Day Without Output",
    type: "reflection",
    difficulty: "easy",
    question: "Imagine a computer with no output devices at all — no screen, no speaker, no printer. What problem would this create?",
    options: null,
    correctAnswer: null,
    explanation: "A strong answer notices that the computer could still process data perfectly, but nobody would ever know the result — the work would be invisible and useless to a human user.",
    funFact: "Some computers really do run with almost no traditional output — like servers in data centres — but even those still send output as data over the internet to somewhere a human can eventually see it.",
    realWorldExample: "A calculator with a broken screen might still calculate correctly inside, but it's useless to you if you can never see the answer.",
    xp: 10,
    hint: "Think about whether the computer could still 'work' internally — and whether that would matter to you if you never saw the result."
  },

  // ============================================================
  // MISSION 1 — SECTION 6: Binary
  // ============================================================
  {
    id: "m1-s6-01",
    mission: 1,
    section: "Binary",
    title: "Why Only 0 and 1?",
    type: "mcq",
    difficulty: "medium",
    question: "Why do computers only understand 0s and 1s?",
    options: [
      "Because computers are bad at maths",
      "Because electricity inside a computer is either ON or OFF — nothing in between",
      "Because 0 and 1 are the easiest numbers to draw",
      "Because it saves paper"
    ],
    correctAnswer: "Because electricity inside a computer is either ON or OFF — nothing in between",
    explanation: "Inside a computer, tiny electronic switches are either receiving electricity (ON, represented as 1) or not (OFF, represented as 0). There's no in-between state, which is why binary (base-2, using only 0 and 1) fits perfectly with how the hardware physically works.",
    funFact: "The word 'binary' comes from 'bi-' meaning two — just like a bicycle has two wheels, binary has two possible states.",
    realWorldExample: "A light switch is a simple real-world binary system: it's either ON or OFF, with nothing in between — just like the switches inside a CPU.",
    xp: 15,
    hint: "Think about electricity — what are the only two states a simple switch can be in?"
  },
  {
    id: "m1-s6-02",
    mission: 1,
    section: "Binary",
    title: "Everything Becomes Binary",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: A photo, a song, and a video are all eventually stored as combinations of 0s and 1s inside a computer.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "No matter what the file looks like to you — a photo, a video, or music — inside the computer it is ALWAYS broken down into binary (0s and 1s). Pictures become binary through pixels (tiny coloured dots, each with a binary colour code), sound becomes binary by sampling the sound wave thousands of times per second, and video is just many pictures plus sound, one after another.",
    funFact: "A single high-quality photo can be made of millions of pixels, and each pixel's exact colour is stored using binary numbers.",
    realWorldExample: "When you send a photo on WhatsApp, what actually travels through the internet is a long stream of 0s and 1s that your friend's phone reassembles back into the picture.",
    xp: 15,
    hint: "Think about what's really 'underneath' any file, no matter how it looks on your screen."
  },
  {
    id: "m1-s6-03",
    mission: 1,
    section: "Binary",
    title: "Pixels Up Close",
    type: "image-id",
    difficulty: "medium",
    question: "Look at a zoomed-in picture showing tiny coloured squares that make up a larger image. What are these tiny squares called?",
    options: ["Pixels", "Bits", "Icons", "Files"],
    correctAnswer: "Pixels",
    explanation: "A pixel (short for 'picture element') is the smallest single dot of colour in a digital image. Thousands or millions of pixels arranged together create the full picture you see. Each pixel's colour is itself stored as a binary number.",
    funFact: "'Pixel' is a shortened combination of the words 'picture' and 'element.'",
    realWorldExample: "When you zoom very far into a photo on your phone until it looks 'blocky,' those visible squares are the individual pixels.",
    xp: 15,
    hint: "This word is a shortened combination of two other words — one of them is 'picture.'"
  },
  {
    id: "m1-s6-04",
    mission: 1,
    section: "Binary",
    title: "Sound Waves to Binary",
    type: "fill-blank",
    difficulty: "hard",
    question: "Fill in the blank: A computer records sound by measuring (sampling) the sound wave thousands of times every ___, then storing each measurement as a binary number.",
    options: null,
    correctAnswer: "second",
    explanation: "A microphone and sound card sample the sound wave many thousands of times per second, and each sample is turned into a binary number. Play those numbers back quickly enough, and it recreates the original sound so smoothly your ear can't tell the difference from the real thing.",
    funFact: "Standard music CDs sample sound 44,100 times every single second — that's called the 'sample rate.'",
    realWorldExample: "This is exactly how a voice note on WhatsApp works — your voice is sampled thousands of times per second and turned into binary data to send.",
    xp: 20,
    hint: "Think about how frequently something needs to be measured to sound smooth and continuous, not choppy."
  },
  {
    id: "m1-s6-05",
    mission: 1,
    section: "Binary",
    title: "Reflection: Binary Everywhere",
    type: "reflection",
    difficulty: "easy",
    question: "Now that you know pictures, sound, and video are all really just 0s and 1s underneath — does that change how you think about your phone's files? Explain briefly.",
    options: null,
    correctAnswer: null,
    explanation: "There's no fixed right answer — this is meant to build curiosity about how differently things 'look' on the surface (a photo, a song) versus what's really happening underneath (binary numbers).",
    funFact: "Because everything reduces to the same binary code, a computer can combine text, pictures, sound and video into one file — like a video with subtitles and music all together.",
    realWorldExample: "This is also why the same computer chip can run a calculator app, play music, and show a video — it's all just different patterns of 0s and 1s being processed.",
    xp: 10,
    hint: "Think about whether a 'photo' and a 'song' are really as different as they look, once you go deep enough inside the machine."
  },

  // ============================================================
  // MISSION 1 — SECTION 7: Hardware vs Software
  // ============================================================
  {
    id: "m1-s7-01",
    mission: 1,
    section: "Hardware vs Software",
    title: "Touch It or Not?",
    type: "sorting",
    difficulty: "easy",
    question: "Sort into Hardware and Software: Keyboard, Microsoft Word, Windows, Monitor, a mobile game app, RAM.",
    options: ["Keyboard", "Microsoft Word", "Windows", "Monitor", "a mobile game app", "RAM"],
    correctAnswer: {
      "Hardware": ["Keyboard", "Monitor", "RAM"],
      "Software": ["Microsoft Word", "Windows", "a mobile game app"]
    },
    explanation: "Hardware is anything physical you can actually touch — the keyboard, monitor, and RAM chip are real objects. Software is a set of instructions/programs that run ON the hardware but has no physical form of its own — Windows (an operating system), Word (an application), and a game app are all software.",
    funFact: "You can drop hardware and (usually) still see it, but you can never 'drop' software — it exists only as instructions stored in binary.",
    realWorldExample: "When your phone's screen (hardware) cracks, the WhatsApp app (software) is still perfectly fine — they're two completely separate things.",
    xp: 15,
    hint: "Ask yourself: can I physically pick this up and hold it in my hand?"
  },
  {
    id: "m1-s7-02",
    mission: 1,
    section: "Hardware vs Software",
    title: "Operating System vs Application",
    type: "mcq",
    difficulty: "medium",
    question: "What is the key difference between an Operating System and an Application (like a game or Word)?",
    options: [
      "There is no difference, they mean the same thing",
      "The Operating System manages the whole computer and lets applications run on top of it",
      "Applications control the hardware directly, and the OS just displays icons",
      "The Operating System is hardware, applications are software"
    ],
    correctAnswer: "The Operating System manages the whole computer and lets applications run on top of it",
    explanation: "The Operating System (like Windows or Android) is the foundational software that manages hardware and resources, and it allows other software — applications like games, Word, or WhatsApp — to run on top of it. Applications depend on the OS; without an OS, no app can run at all.",
    funFact: "You can install many different applications on one Operating System, but usually a device runs only one Operating System at a time.",
    realWorldExample: "Your phone's Android or iOS is the Operating System. Instagram, WhatsApp, and games are all applications running on top of it.",
    xp: 15,
    hint: "Think about which one has to start up FIRST before you can open anything else."
  },
  {
    id: "m1-s7-03",
    mission: 1,
    section: "Hardware vs Software",
    title: "True or False: Can Software Wear Out?",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: Software can physically wear out over time the same way hardware parts can.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Software doesn't physically wear out — it's just code (instructions). It can become outdated, buggy, or stop being supported, but it doesn't 'wear down' from use the way a moving hard disk part or a keyboard button can from years of pressing.",
    funFact: "Some software written decades ago still runs perfectly today if you have the right hardware to run it on — unlike hardware, which physically ages.",
    realWorldExample: "An old phone's battery (hardware) can wear out and hold less charge over years of use, but the calculator app (software) works exactly the same as day one.",
    xp: 15,
    hint: "Think about whether code — instructions with no physical parts — can 'wear down' the way a moving part can."
  },
  {
    id: "m1-s7-04",
    mission: 1,
    section: "Hardware vs Software",
    title: "Real Examples Around You",
    type: "scenario",
    difficulty: "medium",
    question: "Angelo's laptop screen went black, but his files inside were untouched when he plugged it into another monitor. What does this tell us about hardware and software?",
    options: [
      "Hardware failures can occur without affecting the software or data stored",
      "This means the software also failed",
      "It means his files were deleted",
      "It's impossible for this to happen"
    ],
    correctAnswer: "Hardware failures can occur without affecting the software or data stored",
    explanation: "This is a great real example: the monitor (hardware) failed, but the operating system, applications, and files (software/data) were completely unaffected — proving they are genuinely separate things, even though we experience them together every day.",
    funFact: "This is exactly why computer repair shops can often recover your files even when your screen, keyboard, or other hardware parts are badly damaged.",
    realWorldExample: "If your phone's screen cracks badly, a repair shop can often still pull your photos off the storage — because the data survives even when the hardware fails.",
    xp: 20,
    hint: "Think about what actually failed here — was it the physical screen, or the data stored inside?"
  },
  {
    id: "m1-s7-05",
    mission: 1,
    section: "Hardware vs Software",
    title: "Reflection: Hardware or Software Problem?",
    type: "reflection",
    difficulty: "easy",
    question: "Describe a time your phone or computer had a problem. Was it a hardware problem or a software problem? How do you know?",
    options: null,
    correctAnswer: null,
    explanation: "Any thoughtful answer works — the goal is to practise recognising the difference: physical damage/malfunction = hardware, freezing/crashing apps/updates needed = usually software.",
    funFact: "Technicians often say 'have you tried restarting it?' first because many software problems (not hardware ones) are fixed just by restarting.",
    realWorldExample: "A phone that won't turn on at all might be hardware (a dead battery or broken button); a phone that turns on but an app keeps crashing is usually a software issue.",
    xp: 10,
    hint: "Ask: did something physically stop working, or did something on-screen start behaving strangely?"
  },

  // ============================================================
  // MISSION 1 — SECTION 8: CPU Specifications
  // ============================================================
  {
    id: "m1-s8-01",
    mission: 1,
    section: "CPU Specifications",
    title: "Decode the CPU Name",
    type: "matching",
    difficulty: "hard",
    question: "Match each part of 'Intel Core i5-7200U' to what it tells you.",
    options: [
      { part: "Intel", meaning: "The company that made the processor" },
      { part: "Core i5", meaning: "The performance tier/family (i3, i5, i7, i9 — roughly low to high)" },
      { part: "7", meaning: "The generation (how new the design is)" },
      { part: "200", meaning: "The specific model number within that generation" },
      { part: "U", meaning: "Suffix meaning power-saving, built for laptops with longer battery life" }
    ],
    correctAnswer: "part-meaning pairs as listed",
    explanation: "CPU names look confusing, but they follow a pattern: brand, then family/tier, then a number where the first digit(s) usually show the generation, and a letter suffix at the end hints at its purpose (like power-saving for laptops). Learning to read just these basics helps you understand roughly how powerful and how new a processor is.",
    funFact: "A higher generation number doesn't automatically mean 'better' than a higher tier — an i5 from a very new generation can sometimes outperform an older i7.",
    realWorldExample: "When people go shopping for laptops, checking the CPU name like this helps them avoid buying an old, slow processor disguised in a shiny new-looking laptop.",
    xp: 20,
    hint: "Numbers close to the start usually tell you 'how new'; letters at the end usually tell you 'what kind of use it's built for.'"
  },
  {
    id: "m1-s8-02",
    mission: 1,
    section: "CPU Specifications",
    title: "What Does the Suffix Mean?",
    type: "mcq",
    difficulty: "hard",
    question: "A CPU has the suffix 'HX' at the end of its name. What does this most likely suggest, compared to a 'U' suffix?",
    options: [
      "HX chips are built for maximum performance, often used in gaming laptops or desktops — using more power",
      "HX chips are exactly the same as U chips",
      "HX means the chip cannot process any data",
      "HX chips are only found in calculators"
    ],
    correctAnswer: "HX chips are built for maximum performance, often used in gaming laptops or desktops — using more power",
    explanation: "Suffixes like H, HX, and HK generally indicate higher-performance chips that use more power and generate more heat — great for gaming or heavy tasks. The 'U' suffix, by contrast, means power-saving/efficient, better for longer battery life in slim laptops. It's a trade-off: more power vs more battery life.",
    funFact: "Gaming laptops with HX-class processors often need bigger fans and thicker bodies just to cool down all that extra power.",
    realWorldExample: "A student who just needs a laptop for typing notes and browsing would be fine with a 'U' chip, while someone doing heavy video editing or gaming would look for an 'H' or 'HX' chip.",
    xp: 20,
    hint: "Think about the trade-off between raw power and battery-saving — which one usually needs more cooling and more electricity?"
  },
  {
    id: "m1-s8-03",
    mission: 1,
    section: "CPU Specifications",
    title: "True or False: Bigger Numbers Always Win",
    type: "true-false",
    difficulty: "hard",
    question: "True or False: A processor with a bigger model number is always faster than one with a smaller model number.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "This is false, and it's a very common shopping mistake. A newer-generation i5 can sometimes beat an older i7, because the generation and design improvements matter as much as — or more than — the raw number. You have to compare generation AND tier together, not just look at one number.",
    funFact: "Because of this confusion, many buyers get tricked into paying more for an 'i7' laptop that's actually slower than a newer 'i5' model — always check the generation number too.",
    realWorldExample: "This is exactly why tech-savvy shoppers in phone/laptop markets always ask 'what generation is it?' before buying, not just the model name.",
    xp: 20,
    hint: "Remember: there are TWO things that matter in a CPU name — the tier (i5, i7) AND the generation number. A bigger number in only one of them doesn't guarantee overall speed."
  },
  {
    id: "m1-s8-04",
    mission: 1,
    section: "CPU Specifications",
    title: "Reflection: Reading a Spec Sheet",
    type: "reflection",
    difficulty: "medium",
    question: "If you saw 'Intel Core i7-1165G7' on a laptop for sale, what would you now try to figure out about it, using what you've learned?",
    options: null,
    correctAnswer: null,
    explanation: "A good answer would mention identifying the brand (Intel), the tier (i7), and trying to work out the generation from the number, even if the exact suffix (G7, in this case, hints at built-in graphics) wasn't taught in detail.",
    funFact: "There are dozens of suffix letters used across different CPU brands (Intel and AMD) — you don't need to memorise them all, just know that they exist and hint at purpose.",
    realWorldExample: "Anyone shopping for a laptop for the first time can avoid being oversold a weak, outdated machine just by knowing how to roughly read these codes.",
    xp: 15,
    hint: "Break the code into pieces the same way we did with the example in this lesson: brand, tier, generation, extra letters."
  },

  // ============================================================
  // MISSION 1 — SECTION 9: GIGO
  // ============================================================
  {
    id: "m1-s9-01",
    mission: 1,
    section: "GIGO",
    title: "What Does GIGO Mean?",
    type: "fill-blank",
    difficulty: "easy",
    question: "GIGO stands for 'Garbage In, ___ Out.'",
    options: null,
    correctAnswer: "Garbage",
    explanation: "GIGO means: if you feed a computer wrong or poor-quality data (garbage in), it will give you a wrong or poor-quality result (garbage out). A computer cannot magically fix bad input — it simply processes whatever it's given, correctly or not.",
    funFact: "GIGO applies to more than computers — even in cooking, 'bad ingredients in' usually means 'bad meal out,' no matter how skilled the cook is.",
    realWorldExample: "If you type the wrong numbers into a calculator, it will give a perfectly calculated — but completely wrong — answer, because it trusted your input.",
    xp: 10,
    hint: "Whatever kind of input goes in, that's the kind of quality that comes back out."
  },
  {
    id: "m1-s9-02",
    mission: 1,
    section: "GIGO",
    title: "Scenario: The Wrong Grade",
    type: "scenario",
    difficulty: "medium",
    question: "A teacher accidentally types Angelo's score as 45 instead of 54 into the school's computer system. The system then prints 'FAIL' on his report card. Whose fault is this, and what concept explains it?",
    options: [
      "The computer's fault — it should have known the real score",
      "This is GIGO — the computer only did what the wrong input told it to do",
      "It's nobody's fault, computers randomly make mistakes",
      "The printer caused the error"
    ],
    correctAnswer: "This is GIGO — the computer only did what the wrong input told it to do",
    explanation: "This is a textbook GIGO scenario. The computer processed exactly what it was given — it has no way of knowing the real score unless correct data is entered. The mistake happened at the INPUT stage (a human typing error), not inside the computer's processing.",
    funFact: "Because of GIGO, most serious systems (banks, schools, hospitals) build in double-checks — like requiring someone to re-enter data twice, or confirm it — to catch input mistakes before they cause damage.",
    realWorldExample: "A famous real-world example: in 1999, a NASA spacecraft was lost partly because one team used different measurement units (metric vs imperial) than another team — a data/input mismatch, not a computer 'malfunction.'",
    xp: 20,
    hint: "Ask: did the mistake happen because the computer thought wrongly, or because it was GIVEN the wrong information?"
  },
  {
    id: "m1-s9-03",
    mission: 1,
    section: "GIGO",
    title: "Reflection: Your Own GIGO Story",
    type: "reflection",
    difficulty: "easy",
    question: "Can you think of a time YOU (or someone you know) got a wrong result because of a small input mistake — even without a computer involved? Describe it.",
    options: null,
    correctAnswer: null,
    explanation: "The point here is to notice that GIGO isn't just a computer idea — it's a life idea. Wrong ingredients, wrong directions, wrong measurements — all lead to wrong results, no matter how good the 'processing' (cooking, walking, building) is afterward.",
    funFact: "GIGO is sometimes jokingly extended by programmers to 'Garbage In, Gospel Out' — warning that people sometimes trust a computer's wrong answer just because it came from a computer!",
    realWorldExample: "If someone gives you the wrong house address, you can follow perfect directions and still end up at the wrong house — that's GIGO in real life.",
    xp: 10,
    hint: "Think about any time being given wrong information led to a wrong result, even if no computer was involved at all."
  },

  // ============================================================
  // MISSION 1 — END OF MISSION REFLECTION
  // ============================================================
  {
    id: "m1-reflect-01",
    mission: 1,
    section: "Mission 1 Reflection",
    title: "Wrapping Up Mission 1",
    type: "reflection",
    difficulty: "easy",
    question: "What is one thing you learned today? What confused you? What would you like to learn next?",
    options: null,
    correctAnswer: null,
    explanation: "Well done finishing Mission 1! Reflecting on what confused you is just as valuable as remembering what you understood well — it tells your teacher exactly where to help next.",
    funFact: "Writing down what confuses you is a proven learning technique called 'metacognition' — thinking about your own thinking.",
    realWorldExample: "Even professional engineers keep 'confusion logs' when learning new systems, so they can revisit tricky parts later.",
    xp: 25,
    hint: "There's no wrong answer here — just be honest about what stuck and what didn't."
  },

  // ============================================================
  // MISSION 2 — Operating Systems
  // ============================================================
  {
    id: "m2-os-01",
    mission: 2,
    section: "Operating Systems",
    title: "The Translator Analogy",
    type: "mcq",
    difficulty: "medium",
    question: "Why is an Operating System often described as a 'translator' between you and the hardware?",
    options: [
      "Because it literally translates languages like English to French",
      "Because it converts your simple actions (taps, clicks) into instructions the hardware can carry out",
      "Because it only works if you speak to it",
      "Because it prints translated documents"
    ],
    correctAnswer: "Because it converts your simple actions (taps, clicks) into instructions the hardware can carry out",
    explanation: "You don't speak the hardware's language (electrical signals and binary code), and the hardware doesn't understand human actions directly. The Operating System sits in between, translating your click or tap into instructions the hardware can actually execute — and translating the hardware's results back into something you can see and understand.",
    funFact: "Without an Operating System, even a simple task like moving a mouse cursor would require direct, complicated hardware-level programming.",
    realWorldExample: "When you tap an app icon on your phone, Android or iOS (the OS) is quietly translating that tap into instructions that open the right program.",
    xp: 15,
    hint: "Think about what would need to happen between YOUR tap and the actual electronic hardware responding."
  },
  {
    id: "m2-os-02",
    mission: 2,
    section: "Operating Systems",
    title: "Name That OS",
    type: "matching",
    difficulty: "easy",
    question: "Match each Operating System to the type of device it's most associated with.",
    options: [
      { os: "Windows", device: "Most desktop/laptop computers" },
      { os: "macOS", device: "Apple computers (MacBooks, iMacs)" },
      { os: "Android", device: "Most non-Apple smartphones" },
      { os: "iOS", device: "iPhones" },
      { os: "Linux", device: "Servers and some enthusiast/developer computers" }
    ],
    correctAnswer: "os-device pairs as listed",
    explanation: "Every device needs an Operating System, but different companies build different ones for different purposes. Apple builds macOS for computers and iOS for iPhones — separate systems. Android, made by Google, runs on many different phone brands, unlike iOS which only runs on Apple devices.",
    funFact: "Linux is free and 'open source,' meaning anyone can view and modify its code — it quietly powers most of the internet's servers, even though most people never see it directly.",
    realWorldExample: "If your friend has a Samsung phone and you have an iPhone, you're using two different Operating Systems (Android vs iOS) even though both are 'smartphones.'",
    xp: 15,
    hint: "Think about which company makes which device — Apple products stay in the Apple family."
  },
  {
    id: "m2-os-03",
    mission: 2,
    section: "Operating Systems",
    title: "True or False: Multiple OS at once",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: A single computer can usually run its main tasks using two completely different Operating Systems fully active at the exact same time.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Normally, one device runs one main Operating System at a time — that OS manages all the hardware. (Advanced setups like 'virtual machines' can simulate a second OS, but that's a special exception most learners won't need yet, not the everyday norm.)",
    funFact: "Some tech enthusiasts install multiple Operating Systems on one computer and choose which one to start up with — this is called 'dual booting.'",
    realWorldExample: "Your school's computer lab likely has computers all running one Operating System (probably Windows) — not switching between several at once.",
    xp: 15,
    hint: "Think about your own phone or computer at home — how many Operating Systems does it usually run for everyday use?"
  },
  {
    id: "m2-os-04",
    mission: 2,
    section: "Operating Systems",
    title: "Reflection: Life Without an OS",
    type: "reflection",
    difficulty: "easy",
    question: "Imagine turning on a computer that has powerful hardware but NO Operating System installed. What do you think would happen when you press the power button?",
    options: null,
    correctAnswer: null,
    explanation: "A strong answer recognises that without an OS, the hardware has no way to understand or respond to your actions — there'd be no desktop, no apps, nothing to interact with, even though the hardware itself is perfectly fine.",
    funFact: "A computer with no Operating System installed will often just show a blank or error screen when turned on — this is sometimes called 'no bootable device found.'",
    realWorldExample: "This is like buying a brand-new car engine with no steering wheel, pedals, or dashboard — the engine works, but you can't actually control or use it.",
    xp: 10,
    hint: "Think about what the OS actually DOES — then imagine that job simply not existing."
  },

  // ============================================================
  // MISSION 2 — BIOS & CMOS
  // ============================================================
  {
    id: "m2-bios-01",
    mission: 2,
    section: "BIOS",
    title: "What Does BIOS Stand For?",
    type: "fill-blank",
    difficulty: "medium",
    question: "BIOS stands for Basic ___ Output System.",
    options: null,
    correctAnswer: "Input",
    explanation: "BIOS = Basic Input Output System. It's a small program built into the computer's hardware that runs the moment you press the power button — before the full Operating System even loads.",
    funFact: "BIOS is one of the oldest pieces of software still used in modern PCs — the concept dates back to the 1970s and 80s.",
    realWorldExample: "That quick logo or text screen you sometimes see for a split second right when you turn on a computer, before Windows appears — that's the BIOS doing its job.",
    xp: 15,
    hint: "The full name has three key words — you already know two of them from earlier lessons: Input and Output."
  },
  {
    id: "m2-bios-02",
    mission: 2,
    section: "BIOS",
    title: "Order the Boot Sequence",
    type: "ordering",
    difficulty: "medium",
    question: "Put the boot-up sequence in the correct order.",
    options: ["Power button pressed", "BIOS checks hardware", "Operating System loads", "Desktop appears"],
    correctAnswer: ["Power button pressed", "BIOS checks hardware", "Operating System loads", "Desktop appears"],
    explanation: "When you press the power button, the BIOS wakes up FIRST and quickly checks that essential hardware (like RAM and storage) is working. Only after that check passes does it hand control over to load the full Operating System, which finally shows you the desktop.",
    funFact: "If the BIOS finds a serious hardware problem during its check, it can stop the boot process entirely and beep in a special pattern to signal what's wrong — long before Windows or any OS even gets a chance to load.",
    realWorldExample: "This is similar to a pilot doing a pre-flight safety checklist before actually taking off — the plane won't fly (OS won't load) if the checklist (BIOS check) fails.",
    xp: 20,
    hint: "Think logically: something has to check the hardware is safe BEFORE the big Operating System is trusted to load."
  },
  {
    id: "m2-cmos-01",
    mission: 2,
    section: "CMOS",
    title: "What Does CMOS Do?",
    type: "mcq",
    difficulty: "medium",
    question: "What is the main job of the CMOS battery and chip in a computer?",
    options: [
      "It stores your saved documents",
      "It stores BIOS settings and keeps the system clock running, even when the computer is off",
      "It powers the whole laptop",
      "It connects to the internet"
    ],
    correctAnswer: "It stores BIOS settings and keeps the system clock running, even when the computer is off",
    explanation: "CMOS is a small chip with its own tiny battery that keeps certain settings (like BIOS configuration and the system date/time) saved even when the computer is completely unplugged. Without it, your computer would 'forget' the date and time (and other settings) every time it lost power.",
    funFact: "If an old desktop computer keeps showing the wrong date and time every time it's switched on, it's often a sign that the small CMOS battery inside has run out and needs replacing.",
    realWorldExample: "This is why an old, unused desktop computer might show the year as something strange like 2002 the first time it's powered on after years in storage — its CMOS battery died.",
    xp: 15,
    hint: "Think about what a computer needs to 'remember' even when it has absolutely no power at all."
  },

  // ============================================================
  // MISSION 2 — Desktop, Navigation, and Files
  // ============================================================
  {
    id: "m2-desk-01",
    mission: 2,
    section: "Desktop",
    title: "Name the Desktop Parts",
    type: "hotspot",
    difficulty: "easy",
    question: "Click on the Taskbar, then the Start Menu, then the System Tray/Clock on the sample desktop image.",
    options: ["Taskbar", "Start Menu", "System Tray/Clock", "Wallpaper"],
    correctAnswer: ["Taskbar", "Start Menu", "System Tray/Clock"],
    explanation: "The Taskbar usually runs along the bottom of the screen showing open programs; the Start Menu (usually bottom-left) is where you launch programs and search; the System Tray/Clock (usually bottom-right) shows small icons, notifications, and the time. Knowing these locations makes navigating ANY Windows computer faster.",
    funFact: "The Start Menu has existed since Windows 95 — nearly 30 years ago — and is still one of the most recognisable parts of Windows today.",
    realWorldExample: "If you sit at any unfamiliar Windows computer — at a cybercafé, a friend's house, or a library — the taskbar and Start Menu are almost always in the same place, so you can navigate instantly.",
    xp: 15,
    hint: "The Taskbar usually stretches along one edge of the screen — most often the bottom."
  },
  {
    id: "m2-desk-02",
    mission: 2,
    section: "Windows Navigation",
    title: "Click Types",
    type: "matching",
    difficulty: "easy",
    question: "Match each mouse action to what it typically does.",
    options: [
      { action: "Single click", result: "Selects an icon or item" },
      { action: "Double click", result: "Opens a file or program" },
      { action: "Right click", result: "Opens a menu of extra options" },
      { action: "Drag and drop", result: "Moves an item from one place to another" }
    ],
    correctAnswer: "action-result pairs as listed",
    explanation: "These four actions are the foundation of using almost any computer. A single click SELECTS, a double click OPENS, a right click shows MORE OPTIONS, and dragging MOVES things. Mixing up single and double click is one of the most common beginner slip-ups.",
    funFact: "On touchscreens, a 'long press' often replaces what a right-click does on a computer with a mouse — same idea, different gesture.",
    realWorldExample: "To rename a file, you often single-click to select it first, then right-click to find the 'Rename' option — using two of these actions together.",
    xp: 15,
    hint: "Ask: does this action pick something, open something, show more choices, or move something?"
  },
  {
    id: "m2-desk-03",
    mission: 2,
    section: "Windows Navigation",
    title: "Scenario: Renaming a File",
    type: "scenario",
    difficulty: "medium",
    question: "Angelo wants to rename a file called 'Untitled.docx' to 'MyEssay.docx.' What is the correct first step?",
    options: [
      "Delete the file completely and create a new one",
      "Right-click the file and select Rename, or click it once and press F2",
      "Double-click the file to open it, then shout the new name",
      "Move the file to the Recycle Bin"
    ],
    correctAnswer: "Right-click the file and select Rename, or click it once and press F2",
    explanation: "Renaming doesn't require deleting or opening the file at all — a right-click menu (or the F2 keyboard shortcut) lets you edit just the file's name directly, keeping all its contents exactly as they were.",
    funFact: "F2 is a universal 'rename' shortcut across almost every version of Windows — it's one of the most useful shortcuts to memorise.",
    realWorldExample: "Renaming files properly (instead of just remembering 'the third file down') becomes essential once you're managing dozens or hundreds of school assignments and projects.",
    xp: 15,
    hint: "You don't need to delete or reopen anything to change just a name."
  },
  {
    id: "m2-files-01",
    mission: 2,
    section: "Files",
    title: "Sort the File Extensions",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these file extensions into the correct category: .jpg, .mp4, .docx, .exe, .pptx, .png.",
    options: [".jpg", ".mp4", ".docx", ".exe", ".pptx", ".png"],
    correctAnswer: {
      "Pictures": [".jpg", ".png"],
      "Videos": [".mp4"],
      "Documents": [".docx", ".pptx"],
      "Programs": [".exe"]
    },
    explanation: "A file extension (the letters after the dot) tells the computer what TYPE of file it is and which program should open it. Pictures usually end in .jpg or .png, videos in .mp4, documents in .docx or .pptx, and programs (installable software) in .exe. Recognising extensions helps you know what a file is before even opening it.",
    funFact: "'.jpg' comes from 'JPEG,' named after the group that created the format: the Joint Photographic Experts Group.",
    realWorldExample: "If someone sends you a file ending in .exe, you should be extra careful — that means it's a program that will install/run something on your computer, not just a document to read.",
    xp: 20,
    hint: "Group them by what kind of content they hold: still images, moving video, written documents, or runnable software."
  },
  {
    id: "m2-files-02",
    mission: 2,
    section: "Files",
    title: "The .com Misconception",
    type: "mcq",
    difficulty: "hard",
    question: "Angelo says: '.com is a file extension, just like .docx or .jpg.' Is he correct?",
    options: [
      "Yes, .com works exactly like .docx",
      "No — .com, .org, .edu, and .ng are DOMAIN extensions (used for website addresses), not file extensions",
      "Yes, but only for pictures",
      "No, because .com doesn't exist at all"
    ],
    correctAnswer: "No — .com, .org, .edu, and .ng are DOMAIN extensions (used for website addresses), not file extensions",
    explanation: "This is a genuinely common mix-up, so it's worth being extra clear: .com, .org, .edu, and .ng are DOMAIN extensions — they appear at the end of website addresses (like example.com) to show what kind of organisation or country runs the site. File extensions (like .docx, .jpg, .mp4) instead tell you what TYPE of file is stored on YOUR computer. They look similar (a dot followed by letters) but serve completely different purposes in completely different places.",
    funFact: "'.ng' is Nigeria's own country domain extension — similar to how the UK uses '.uk' and the USA sometimes uses '.us.'",
    realWorldExample: "A website like 'jamb.gov.ng' uses domain extensions ('.gov.ng') to show it's an official Nigerian government site — completely different from naming a document 'result.docx' on your laptop.",
    xp: 20,
    hint: "Ask: does this dot-and-letters appear at the end of a website address, or at the end of a file saved on a computer?"
  },
  {
    id: "m2-files-03",
    mission: 2,
    section: "Files",
    title: "Website or File?",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these into 'Website Address (Domain)' and 'File on a Computer': google.com, holiday-photo.jpg, jamb.gov.ng, essay.docx, wikipedia.org.",
    options: ["google.com", "holiday-photo.jpg", "jamb.gov.ng", "essay.docx", "wikipedia.org"],
    correctAnswer: {
      "Website Address (Domain)": ["google.com", "jamb.gov.ng", "wikipedia.org"],
      "File on a Computer": ["holiday-photo.jpg", "essay.docx"]
    },
    explanation: "This directly practises telling apart domain extensions (.com, .org, .gov.ng) from file extensions (.jpg, .docx) — the exact misconception flagged earlier. Both use a 'dot' pattern, which is exactly why they get confused, but one identifies a place on the internet, and the other identifies a type of saved file.",
    funFact: "Some organisations even own BOTH a domain and store files with similar-looking names — e.g., a company's website might be 'company.com' while they also save a file called 'report.docx' — completely unrelated dots!",
    realWorldExample: "When applying for JAMB or WAEC online, you visit a domain (like a '.gov.ng' website) but you might upload a file (like a '.jpg' passport photo) — both are needed, but they're two very different things.",
    xp: 20,
    hint: "One group is a place you visit online. The other is something saved on a device."
  },
  {
    id: "m2-files-04",
    mission: 2,
    section: "Files",
    title: "Reflection: The .com Confusion",
    type: "reflection",
    difficulty: "easy",
    question: "Before this lesson, did you think .com and .docx were the same kind of thing? Explain the real difference in your own words now.",
    options: null,
    correctAnswer: null,
    explanation: "This misconception is extremely common — even among adults — so there's no shame in having had it. What matters is being able to now clearly explain: domain extensions identify websites; file extensions identify file types on a device.",
    funFact: "Even some new computer teachers occasionally mix these two up when explaining them quickly — it's a genuinely tricky pair of look-alikes.",
    realWorldExample: "Knowing this difference helps you spot fake or suspicious links too — a real bank website's domain won't suddenly look like a file name.",
    xp: 10,
    hint: "Try explaining it to an imaginary younger student — where does one appear, and where does the other appear?"
  },
  {
    id: "m2-practical-01",
    mission: 2,
    section: "Practical Windows Activities",
    title: "Order: Saving a New Document",
    type: "ordering",
    difficulty: "medium",
    question: "Put these steps in order for saving a new Word document for the first time.",
    options: ["Open Microsoft Word and type your work", "Click Save (or press Ctrl+S)", "Choose a folder and type a file name", "Click the final Save button to confirm"],
    correctAnswer: ["Open Microsoft Word and type your work", "Click Save (or press Ctrl+S)", "Choose a folder and type a file name", "Click the final Save button to confirm"],
    explanation: "Saving for the first time always asks WHERE (which folder) and WHAT (which file name) before it actually stores the file. Skipping the 'choose a folder' step is how many learners lose track of their own files — always know where you're saving before you click the final Save.",
    funFact: "Ctrl+S is one of the most universally recognised keyboard shortcuts across almost every piece of software in the world, not just Word.",
    realWorldExample: "Losing an assignment because 'the laptop shut down before I saved' is one of the most common (and most avoidable) mistakes students make — regularly pressing Ctrl+S prevents this.",
    xp: 15,
    hint: "You have to create the content before you can save it, and you have to choose where it goes before confirming."
  },
  {
    id: "m2-practical-02",
    mission: 2,
    section: "Practical Windows Activities",
    title: "Scenario: The Missing File",
    type: "scenario",
    difficulty: "medium",
    question: "Angelo saved a document yesterday but can't find it today. What is the SMARTEST first step to find it?",
    options: [
      "Assume it's gone forever and start over from scratch",
      "Use the Search/Find feature and type part of the file name",
      "Restart the computer ten times",
      "Delete all folders and hope it reappears"
    ],
    correctAnswer: "Use the Search/Find feature and type part of the file name",
    explanation: "The Search feature scans through folders quickly for matching file names, which is far faster and safer than manually clicking through every folder — or worse, giving up and redoing the work. Restarting or deleting things won't help locate a specific file.",
    funFact: "Windows Search can also look INSIDE some documents for matching words, not just file names — so even a vague memory of your file's content can sometimes help find it.",
    realWorldExample: "This is one of the most valuable real-life skills in this whole mission — students who don't know how to search properly often waste hours redoing lost work unnecessarily.",
    xp: 20,
    hint: "Before assuming a file is truly lost, what feature exists specifically to hunt through folders for you?"
  },
  {
    id: "m2-practical-03",
    mission: 2,
    section: "Practical Windows Activities",
    title: "True or False: Recycle Bin",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: Once a file is deleted and sent to the Recycle Bin, it is gone forever immediately.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Deleting a file normally just moves it to the Recycle Bin — a temporary holding area. You can restore it from there. It's only truly gone once you empty the Recycle Bin (or delete it while holding Shift, which skips the Bin entirely).",
    funFact: "Even after emptying the Recycle Bin, specialist recovery software can SOMETIMES still bring files back, because the data isn't always wiped instantly — just marked as 'space that can be reused.'",
    realWorldExample: "If you accidentally delete an important school project, checking the Recycle Bin first — before panicking — often solves the whole problem in seconds.",
    xp: 15,
    hint: "Think about the actual purpose of having a 'Bin' at all — why would it exist if deleting was already permanent?"
  },
  {
    id: "m2-practical-04",
    mission: 2,
    section: "Practical Windows Activities",
    title: "Copy vs Cut vs Paste",
    type: "matching",
    difficulty: "medium",
    question: "Match each action to what it actually does to a file.",
    options: [
      { action: "Copy", result: "Keeps the original in place and creates a duplicate wherever you paste" },
      { action: "Cut", result: "Removes the file from its original place once it's pasted elsewhere" },
      { action: "Paste", result: "Places whatever was copied or cut into the new location" }
    ],
    correctAnswer: "action-result pairs as listed",
    explanation: "Copy leaves the original untouched and makes a second version elsewhere. Cut is different — it fully MOVES the file, so the original location ends up empty once pasted. Confusing Copy and Cut is a common mistake that can make you think you've 'lost' a file when it's actually just been moved.",
    funFact: "The keyboard shortcuts Ctrl+C (copy), Ctrl+X (cut), and Ctrl+V (paste) have stayed almost unchanged across decades of computer design.",
    realWorldExample: "If you Cut a photo from one folder intending to Paste it into another, but you forget to actually paste it, the photo isn't duplicated anywhere yet — it's essentially 'in your clipboard,' waiting.",
    xp: 15,
    hint: "One of these three leaves a copy behind in the original spot. One of them doesn't."
  },

  // ============================================================
  // MISSION 2 — END OF MISSION REFLECTION
  // ============================================================
  {
    id: "m2-reflect-01",
    mission: 2,
    section: "Mission 2 Reflection",
    title: "Wrapping Up Mission 2",
    type: "reflection",
    difficulty: "easy",
    question: "What is one thing you learned today? What confused you? What would you like to learn next?",
    options: null,
    correctAnswer: null,
    explanation: "Great work completing Mission 2! You now understand not just how a computer works inside, but how to actually navigate and manage it day to day — a genuinely useful, practical skill set.",
    funFact: "Everything you learned across both missions — input, processing, storage, output, binary, hardware/software, and now navigation — is literally the foundation every computer scientist starts from.",
    realWorldExample: "These same core ideas apply whether you go on to build websites, apps, games, or even robots — it all starts with these fundamentals.",
    xp: 25,
    hint: "Be honest about what's still fuzzy — that's exactly what makes the next lesson useful to you."
  },

  // ============================================================
  // MISSION 3 — Keyboard & Human–Computer Interaction
  // ============================================================
  {
    id: "m3-history-01",
    mission: 3,
    section: "Keyboard History",
    title: "Typewriter or Computer?",
    type: "mcq",
    difficulty: "medium",
    question: "Why is a traditional typewriter NOT a computer?",
    options: ["It has keys", "It can type letters", "It gives input and output, but does not process or store information digitally", "It is too old to count"],
    correctAnswer: "It gives input and output, but does not process or store information digitally",
    explanation: "A typewriter accepts your key presses and puts letters on paper, so it has input and output. But it does not digitally process your work or save it for later like a computer does — that missing processing and storage is the big difference.",
    funFact: "Correcting one small mistake on a typewriter could mean using correction fluid or typing the whole page again — there was no Undo button!",
    realWorldExample: "In Word, you can type a paragraph, change it, save it, and print it later. A traditional typewriter prints each key press straight onto paper and cannot keep an editable copy.",
    xp: 15,
    hint: "Remember the four things a computer does: input, processing, storage, and output."
  },
  {
    id: "m3-layout-01",
    mission: 3,
    section: "Keyboard Layouts",
    title: "More Than One Layout",
    type: "true-false",
    difficulty: "easy",
    question: "True or False: QWERTY is the only keyboard layout that exists.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "QWERTY is the layout most people recognise, but DVORAK and Colemak are layouts too. You only need to recognise their names for now — different layouts simply arrange letters differently.",
    funFact: "QWERTY gets its name from the first six letters along the top row of letter keys.",
    realWorldExample: "Most computers in a school lab use QWERTY, which is why you can sit at another familiar keyboard and quickly find the letters.",
    xp: 10,
    hint: "Think back to the other two layout names discussed in class."
  },
  {
    id: "m3-layout-02",
    mission: 3,
    section: "Keyboard Layouts",
    title: "Curiosity: Why QWERTY?",
    type: "reflection",
    difficulty: "easy",
    question: "Why do you think QWERTY is still the most popular layout, even though other layouts exist?",
    options: null,
    correctAnswer: null,
    explanation: "There is no single required answer. A sensible idea is that people, schools, and workplaces are used to QWERTY, so it is easier for everyone to keep using the same familiar layout.",
    funFact: "A layout can stay popular simply because millions of people already know it — technology is not always about replacing everything with something new.",
    realWorldExample: "If a cybercafé changed every keyboard to a layout nobody recognised, customers would need time to relearn where the letters are.",
    xp: 10,
    hint: "Think about why a familiar system can be easier to keep using than learning a new one."
  },
  {
    id: "m3-keys-01",
    mission: 3,
    section: "Keyboard Groups",
    title: "Group the Keys",
    type: "matching",
    difficulty: "medium",
    question: "Match each keyboard group to what it is mainly for.",
    options: [
      { group: "Typing keys", use: "Entering letters, numbers, and punctuation" },
      { group: "Function keys", use: "Doing special jobs, often at the top of the keyboard" },
      { group: "Modifier keys", use: "Changing what another key does" },
      { group: "Navigation keys", use: "Moving around a document or page" },
      { group: "Numeric keypad", use: "Entering numbers quickly" }
    ],
    correctAnswer: "group-use pairs as listed",
    explanation: "A keyboard is more than a set of letter keys. Its groups are arranged for different jobs: typing, special commands, changing other keys, moving around, and entering numbers.",
    funFact: "The numeric keypad is arranged like a calculator, which makes it useful for people entering lots of figures.",
    realWorldExample: "A cashier entering prices may use the numeric keypad much more than someone writing an essay.",
    xp: 15,
    hint: "Match each group name to the job it sounds like it would do."
  },
  {
    id: "m3-keys-02",
    mission: 3,
    section: "Keyboard Groups",
    title: "Find the Modifier Keys",
    type: "hotspot",
    difficulty: "easy",
    question: "On the keyboard picture, click EVERY modifier key you practised in class.",
    options: ["Ctrl", "Shift", "Alt", "Windows key", "Enter", "Arrow key"],
    correctAnswer: ["Ctrl", "Shift", "Alt", "Windows key"],
    explanation: "Ctrl, Shift, Alt, and the Windows key are modifier keys. They often change what another key does, instead of being used only for typing a letter or moving the cursor.",
    funFact: "Most keyboards have two Shift keys and usually two Ctrl keys, so either hand can help with shortcuts.",
    realWorldExample: "You might hold Shift with one hand while pressing a letter with the other to make a capital letter.",
    xp: 10,
    hint: "Look for the keys that are commonly held down together with another key."
  },
  {
    id: "m3-keys-03",
    mission: 3,
    section: "Keyboard Groups",
    title: "Ctrl Needs a Partner",
    type: "drag-drop",
    difficulty: "medium",
    question: "Drag the best ending into the sentence: 'Ctrl usually works by being held with ___. '",
    options: ["another key", "the monitor", "a mouse cable", "nothing at all"],
    correctAnswer: "another key",
    explanation: "Ctrl is a modifier: it usually changes another key into a command. Pressing Ctrl by itself normally does not copy, paste, or select anything — Ctrl+C, Ctrl+V, and Ctrl+A are the useful combinations.",
    funFact: "The word 'Ctrl' is short for 'Control,' because it helps control what other keys do.",
    realWorldExample: "In a document, Ctrl+A selects everything; just tapping Ctrl alone will not select your work.",
    xp: 15,
    hint: "Think about the shortcut combinations you practised, such as Ctrl+C."
  },
  {
    id: "m3-nav-01",
    mission: 3,
    section: "Navigation Keys",
    title: "Navigate the Document",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these keys into 'Moves around content' and 'Edits content': Arrow keys, Home, End, Page Up, Page Down, Insert, Delete.",
    options: ["Arrow keys", "Home", "End", "Page Up", "Page Down", "Insert", "Delete"],
    correctAnswer: {
      "Moves around content": ["Arrow keys", "Home", "End", "Page Up", "Page Down"],
      "Edits content": ["Insert", "Delete"]
    },
    explanation: "Arrow keys, Home, End, Page Up, and Page Down help you move your cursor or view through content. Insert and Delete affect text instead: one can change how typing behaves, while Delete removes something.",
    funFact: "Home and End are named for where they take you: the beginning ('home') and end of a line or document area.",
    realWorldExample: "When reading a long assignment, Page Down helps you move through it much faster than pressing the down arrow many times.",
    xp: 15,
    hint: "Ask whether the key helps you travel through text, or changes the text itself."
  },
  {
    id: "m3-nav-02",
    mission: 3,
    section: "Navigation Keys",
    title: "Practical: Find Home",
    type: "scenario",
    difficulty: "easy",
    question: "Angelo is editing a long line of text and wants to jump quickly to the beginning of that line. Which key should he try?",
    options: ["Home", "End", "Delete", "Alt"],
    correctAnswer: "Home",
    explanation: "The Home key is used to jump back to the beginning of a line in many programs. End does the opposite, while Delete removes text and Alt is a modifier key.",
    funFact: "On compact laptop keyboards, some navigation keys may share space with other keys, but they still do the same navigation jobs.",
    realWorldExample: "If you notice a spelling mistake at the start of a long sentence, Home can get your cursor there quickly.",
    xp: 10,
    hint: "Which key's name suggests going back to the starting point?"
  },
  {
    id: "m3-windows-00",
    mission: 3,
    section: "Windows Navigation",
    title: "Practical: Open Task View",
    type: "ordering",
    difficulty: "easy",
    question: "Put these steps in order for using Task View to return to your Word document.",
    options: ["Click the Word document window", "Open Task View", "Return to the Word document"],
    correctAnswer: ["Open Task View", "Click the Word document window", "Return to the Word document"],
    explanation: "Task View first shows your open windows. You then choose the one you want, and Windows brings that program back to the front — it is for switching, not closing.",
    funFact: "Task View is especially useful when open windows are covering each other and you cannot easily see the one you need.",
    realWorldExample: "After checking a fact in a browser, you can use Task View to return to your assignment without closing either program.",
    xp: 10,
    hint: "You need to see the available windows before you can choose one."
  },
  {
    id: "m3-shortcuts-00",
    mission: 3,
    section: "Keyboard Shortcuts",
    title: "Practical: Show the Desktop",
    type: "fill-blank",
    difficulty: "easy",
    question: "Angelo has several windows open and wants to quickly see the desktop. Complete the shortcut: Windows + ___.",
    options: null,
    correctAnswer: "D",
    explanation: "Windows+D shows the desktop quickly. It is a shortcut, so the Windows key is doing a bigger job here than simply opening the Start Menu.",
    funFact: "Pressing Windows+D again can bring the open windows back, which makes it handy for a quick look at desktop files.",
    realWorldExample: "If a teacher asks you to open a file saved on the desktop while you have many programs open, Windows+D can get you there quickly.",
    xp: 10,
    hint: "Think of the first letter of Desktop."
  },
  {
    id: "m3-touchpad-01",
    mission: 3,
    section: "Touchpad",
    title: "Touchpad Moves",
    type: "matching",
    difficulty: "easy",
    question: "Match each touchpad action to what it usually does.",
    options: [
      { action: "Single tap", result: "Selects or clicks an item" },
      { action: "Double tap", result: "Opens an item" },
      { action: "Two-finger movement", result: "Scrolls a page" },
      { action: "Two-finger tap", result: "Opens a right-click menu" }
    ],
    correctAnswer: "action-result pairs as listed",
    explanation: "A touchpad can understand more than one finger. Single and double taps work like mouse clicks, while two fingers can scroll or bring up extra options with a right-click.",
    funFact: "Touchpads are designed for laptops because they give you a pointing surface without carrying a separate mouse.",
    realWorldExample: "While reading a webpage on a laptop, place two fingers on the touchpad and move them to scroll instead of repeatedly grabbing the scroll bar.",
    xp: 15,
    hint: "Connect each gesture to the mouse action it felt most like during practice."
  },
  {
    id: "m3-windows-01",
    mission: 3,
    section: "Windows Navigation",
    title: "What Task View Does",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: Opening Task View closes all your running programs.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Task View lets you SEE and switch between open windows; it does not close them. It is useful when several programs are open and you need to find the one you want.",
    funFact: "Task View can also help organise work into separate desktops, so different tasks do not have to feel crowded together.",
    realWorldExample: "If your browser, Word document, and File Explorer are all open, Task View helps you jump back to Word without closing anything.",
    xp: 15,
    hint: "Think about what you saw when you opened Task View in class: windows to choose from, not windows disappearing."
  },
  {
    id: "m3-shortcuts-01",
    mission: 3,
    section: "Keyboard Shortcuts",
    title: "Shortcut Situations",
    type: "matching",
    difficulty: "medium",
    question: "Match each shortcut to the job Angelo practised.",
    options: [
      { shortcut: "Ctrl+C", job: "Copies selected work" },
      { shortcut: "Ctrl+V", job: "Pastes copied work" },
      { shortcut: "Ctrl+A", job: "Selects everything" },
      { shortcut: "Alt+Tab", job: "Switches between open windows" },
      { shortcut: "Windows+D", job: "Shows the desktop" }
    ],
    correctAnswer: "shortcut-job pairs as listed",
    explanation: "Shortcuts save time by letting two keys do a job together. They are especially useful for actions you repeat often, such as copying text, selecting work, switching windows, or quickly seeing the desktop.",
    funFact: "The plus sign in Ctrl+C does not mean press a third '+' key — it means hold the first key while pressing the second one.",
    realWorldExample: "If you copy a sentence from one paragraph to another, Ctrl+C copies it and Ctrl+V puts the copy where your cursor is.",
    xp: 20,
    hint: "Picture the exact action you practised after holding the first key in each combination."
  },
  {
    id: "m3-files-01",
    mission: 3,
    section: "File Explorer",
    title: "Where Is It Stored?",
    type: "scenario",
    difficulty: "medium",
    question: "In File Explorer, Angelo opens Schoolwork, then JSS3, then ICT, then finds Essay.docx. What is this chain of folders helping him understand?",
    options: ["The file address or location", "The keyboard layout", "A right-click gesture", "A notification"],
    correctAnswer: "The file address or location",
    explanation: "Folders help organise files, and the path through those folders tells you a file's location or address. This is useful because a file name alone is not always enough when several folders contain similar work.",
    funFact: "A folder can contain both files and other folders, rather like a cupboard containing labelled smaller boxes.",
    realWorldExample: "Saving an essay in Schoolwork > JSS3 > ICT makes it much easier to find later than leaving it in an unknown location.",
    xp: 15,
    hint: "Think about what the list of folders tells you about where the file lives."
  },
  {
    id: "m3-access-01",
    mission: 3,
    section: "Optional Curiosity: Accessibility",
    title: "Curiosity: Caret Browsing",
    type: "mcq",
    difficulty: "easy",
    question: "Caret Browsing lets you move a text cursor around a webpage with the keyboard. Why might that be helpful to some people?",
    options: [
      "It lets them move and select webpage text without needing a mouse or touchpad",
      "It makes every webpage use larger letters automatically",
      "It changes the keyboard into a touchscreen",
      "It closes all the other browser tabs"
    ],
    correctAnswer: "It lets them move and select webpage text without needing a mouse or touchpad",
    explanation: "Caret Browsing can help people who prefer, need, or find it easier to navigate webpages with the keyboard instead of a mouse or touchpad. Accessibility features make computers more usable for different people.",
    funFact: "The blinking vertical line where text will appear is called a caret — that is where Caret Browsing gets its name.",
    realWorldExample: "Someone with a broken mouse, or someone who finds precise mouse movement difficult, may use keyboard navigation to read and select webpage text.",
    xp: 10,
    hint: "Think about what happens if using a mouse or touchpad is difficult or impossible."
  },
  {
    id: "m3-reflect-01",
    mission: 3,
    section: "Mission 3 Reflection",
    title: "Your Most Useful Shortcut",
    type: "reflection",
    difficulty: "easy",
    question: "Which keyboard shortcut do you think you will use most, and what real task will it make easier?",
    options: null,
    correctAnswer: null,
    explanation: "There is no single right choice. The important thing is connecting a shortcut you practised to a real task, because shortcuts become memorable when you actually use them.",
    funFact: "Experts often look fast on computers not because they type every action quicker, but because they know small shortcuts that remove extra steps.",
    realWorldExample: "Ctrl+A can be useful when you want to select all the text in a practice document before changing its font or copying it.",
    xp: 10,
    hint: "Choose from Ctrl+C, Ctrl+V, Ctrl+A, Alt+Tab, or Windows+D."
  },

  // ============================================================
  // MISSION 3 — END OF MISSION REFLECTION
  // ============================================================
  {
    id: "m3-reflect-02",
    mission: 3,
    section: "Mission 3 Reflection",
    title: "Wrapping Up Mission 3",
    type: "reflection",
    difficulty: "easy",
    question: "What surprised you most about keyboards or Windows navigation? What still feels confusing? What question should your teacher answer in the next lesson?",
    options: null,
    correctAnswer: null,
    explanation: "Great work completing Mission 3! Your answers give your teacher useful feedback about what you remembered, what needs more practice, and what you are curious to explore next.",
    funFact: "A keyboard may look simple, but it is really a control panel for typing, moving around, opening tools, and giving commands.",
    realWorldExample: "The next time you use a school or home computer, try one shortcut and one navigation key on purpose — small real-life practice is how these skills become automatic.",
    xp: 25,
    hint: "Be honest — questions and confusion are useful feedback, not mistakes."
  },

  // ============================================================
  // MISSION 4 — Working Smarter with Computers
  // ============================================================
  {
    id: "m4-intro-01",
    mission: 4,
    section: "Working Smarter",
    title: "Mission 4: Work Smarter",
    type: "reflection",
    difficulty: "easy",
    question: "Think back to class: what is one small computer habit that could help someone work faster, more comfortably, or more independently?",
    options: null,
    correctAnswer: null,
    explanation: "There is no single right answer. This mission is about noticing that computers are most useful when they help people save effort, stay comfortable, and take part in work in ways that suit them.",
    funFact: "A feature does not have to look dramatic to be useful — a shortcut, a larger pointer, or a better chair position can make a real difference over a whole day.",
    realWorldExample: "A student might use a keyboard shortcut to finish work faster, then adjust their screen so their neck does not ache while reading the next task.",
    xp: 10,
    hint: "Think about shortcuts, accessibility tools, or how a computer workspace is arranged."
  },

  // ============================================================
  // MISSION 4 — SECTION 1: Productivity
  // ============================================================
  {
    id: "m4-productivity-01",
    mission: 4,
    section: "Productivity",
    title: "Why Shortcuts Help",
    type: "mcq",
    difficulty: "easy",
    question: "Why can a keyboard shortcut improve productivity when you use a computer often?",
    options: [
      "It makes the computer's electricity stronger",
      "It can complete a common action with fewer steps and less switching between mouse and keyboard",
      "It permanently removes the need to learn any computer skills",
      "It makes every program open at exactly the same speed"
    ],
    correctAnswer: "It can complete a common action with fewer steps and less switching between mouse and keyboard",
    explanation: "Shortcuts can save time because they let you trigger common actions directly instead of hunting through menus with a mouse. The important idea is not that every shortcut must be memorised — it is that useful repeated actions can become quicker and smoother.",
    funFact: "Many people use a small number of shortcuts every day without thinking about them, such as Ctrl+C and Ctrl+V.",
    realWorldExample: "If you repeatedly copy notes from one part of a document to another, using Ctrl+C and Ctrl+V can be quicker than opening menus each time.",
    xp: 15,
    hint: "Think about the number of actions needed with a mouse compared with pressing a useful key combination."
  },
  {
    id: "m4-productivity-02",
    mission: 4,
    section: "Productivity",
    title: "Fast Is Not the Only Goal",
    type: "true-false",
    difficulty: "medium",
    question: "True or False: A shortcut is only useful if every computer user can memorise it immediately.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "Shortcuts are optional tools, not a test of who can memorise the most keys. A shortcut becomes useful when it helps a person with a task they do often; someone else may work better with menus, a mouse, touch, or an accessibility tool.",
    funFact: "Professional designers often include both keyboard shortcuts and visible buttons so different people can choose the method that suits them.",
    realWorldExample: "A learner may prefer clicking Save while practising, then start using Ctrl+S later once the shortcut feels natural.",
    xp: 15,
    hint: "Think about whether people always learn and work in exactly the same way."
  },
  {
    id: "m4-productivity-03",
    mission: 4,
    section: "Productivity",
    title: "Practical Challenge: Open Task Manager",
    type: "ordering",
    difficulty: "medium",
    question: "Put these steps in order for using the keyboard shortcut from class to open Task Manager.",
    options: ["Task Manager opens", "Press Esc while still holding Ctrl and Shift", "Hold down Ctrl and Shift"],
    correctAnswer: ["Hold down Ctrl and Shift", "Press Esc while still holding Ctrl and Shift", "Task Manager opens"],
    explanation: "Ctrl+Shift+Esc is a direct shortcut for opening Task Manager. The key lesson is that a well-chosen shortcut can reduce the steps needed for a regular task, especially when you know exactly what you want to open.",
    funFact: "Task Manager can show which programs are running and how much of the computer's resources they are using.",
    realWorldExample: "If a program stops responding, Task Manager can help an adult or teacher identify the program instead of restarting the whole computer immediately.",
    xp: 20,
    hint: "The modifier keys need to be held before the final key can complete the shortcut."
  },
  {
    id: "m4-productivity-04",
    mission: 4,
    section: "Productivity",
    title: "Custom Shortcut Curiosity",
    type: "guess-reveal",
    difficulty: "easy",
    question: "Before revealing the answer: why might someone create a custom shortcut for a program they use every day?",
    options: [
      "To reach that program more quickly",
      "To make the program impossible to close",
      "To change every keyboard into a touchscreen",
      "To remove all other programs from the computer"
    ],
    correctAnswer: "To reach that program more quickly",
    explanation: "A custom shortcut can make a frequently used program easier to open. You only needed to recognise this idea in class — the important point is that people can sometimes adapt a computer setup to support their own routine.",
    funFact: "People who use a particular tool many times a day often save small amounts of time that add up across a week.",
    realWorldExample: "A school office worker who opens the same attendance program every morning may benefit from an easy way to launch it.",
    xp: 10,
    hint: "Think about what would help if you opened the same program again and again."
  },

  // ============================================================
  // MISSION 4 — SECTION 2: Accessibility & Inclusive Design
  // ============================================================
  {
    id: "m4-access-01",
    mission: 4,
    section: "Accessibility",
    title: "Technology Adapts to People",
    type: "scenario",
    difficulty: "medium",
    question: "A student has one arm in a cast for a few weeks and finds pressing two keys together difficult. Which idea best shows accessible technology helping them?",
    options: [
      "Use Sticky Keys so key combinations can be pressed one key at a time",
      "Tell the student computers are only for people with two free hands",
      "Remove the keyboard and do all work on paper",
      "Make the student work faster to keep up"
    ],
    correctAnswer: "Use Sticky Keys so key combinations can be pressed one key at a time",
    explanation: "Sticky Keys can make key combinations easier by allowing modifier keys such as Ctrl, Shift, or Alt to be pressed separately. It can help someone with a temporary injury, a permanent disability, or anyone who finds holding several keys down difficult.",
    funFact: "Accessibility features are useful because people can have different needs at different times — even a short-term injury can change how someone uses a computer.",
    realWorldExample: "Someone carrying a bag, recovering from an injury, or having shaky hands may find a feature that reduces tricky key combinations helpful.",
    xp: 20,
    hint: "Look for the option that changes the computer to suit the person's current need."
  },
  {
    id: "m4-access-02",
    mission: 4,
    section: "Accessibility",
    title: "Match the Support Tool",
    type: "matching",
    difficulty: "medium",
    question: "Match each accessibility tool or idea to what it can help with.",
    options: [
      { tool: "Sticky Keys", support: "Using key combinations one key at a time" },
      { tool: "Filter Keys", support: "Reducing unwanted repeated key presses" },
      { tool: "Speech-to-text", support: "Turning spoken words into typed text" },
      { tool: "Recorded-lecture explanation tool", support: "Helping a learner review and understand spoken lesson content" }
    ],
    correctAnswer: "tool-support pairs as listed",
    explanation: "Accessibility tools support different needs. Sticky Keys can simplify combinations, Filter Keys can reduce accidental repeated input, speech-to-text can turn speech into writing, and tools that explain recordings can help learners revisit lesson content.",
    funFact: "A feature first designed for accessibility often becomes useful to many other people too — speech-to-text can be handy when your hands are busy.",
    realWorldExample: "A learner who missed part of a lesson may replay a recording and use an explanation tool to check a confusing section at their own pace.",
    xp: 20,
    hint: "Match each name to the kind of input, typing, or learning support it suggests."
  },
  {
    id: "m4-access-03",
    mission: 4,
    section: "Accessibility",
    title: "Observation: Choose the Inclusive Design",
    type: "hotspot",
    difficulty: "medium",
    question: "A school is improving its computer room. Click EVERY choice that helps make the space more inclusive for different learners.",
    options: ["Keep clear space for wheelchair movement", "Offer accessibility settings on the computers", "Use labels that are easy to read", "Block the ramp with storage boxes", "Say everyone must use the same input method"],
    correctAnswer: ["Keep clear space for wheelchair movement", "Offer accessibility settings on the computers", "Use labels that are easy to read"],
    explanation: "Inclusive design considers different people from the beginning. Clear space, readable labels, and accessible computer settings can help more learners take part; blocking ramps or forcing one method on everyone creates unnecessary barriers.",
    funFact: "Curb cuts — the sloped parts of pavements — were designed to help wheelchair users, but they also help people pushing prams, trolleys, and bicycles.",
    realWorldExample: "A ramp into a building and a keyboard setting that makes typing easier follow the same idea: change the environment so more people can use it.",
    xp: 15,
    hint: "Choose the options that remove barriers instead of creating them."
  },
  {
    id: "m4-access-04",
    mission: 4,
    section: "Accessibility",
    title: "Accessible for Everyone",
    type: "true-false",
    difficulty: "easy",
    question: "True or False: Accessibility features can be useful to people with temporary needs as well as permanent disabilities.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "This is true. Someone with a broken arm, shaky hands, tired eyes, a noisy room, or a long recorded lesson may benefit from accessibility features even if their need is temporary. Technology should adapt to people, not demand that every person works in one fixed way.",
    funFact: "Captions can support deaf and hard-of-hearing viewers, but they are also useful when watching a video in a noisy place or when you need to keep the sound off.",
    realWorldExample: "A student on a quiet bus may use captions to follow an educational video without disturbing other passengers.",
    xp: 15,
    hint: "Think about needs that can change after an injury or depending on where someone is working."
  },
  {
    id: "m4-access-05",
    mission: 4,
    section: "Accessibility",
    title: "Reflection: Ramps and Settings",
    type: "reflection",
    difficulty: "medium",
    question: "How is an accessibility setting on a computer similar to a ramp into a building? Give one example of who each one could help.",
    options: null,
    correctAnswer: null,
    explanation: "There is no single required wording. A strong reflection notices that both remove a barrier so more people can enter, use, and take part. A ramp can help a wheelchair user, while a computer setting can help someone who finds typing, seeing, hearing, or controlling a mouse difficult.",
    funFact: "Designing for inclusion from the start is usually easier than adding barriers first and trying to remove them later.",
    realWorldExample: "A classroom with a ramp and computers with accessible settings gives more learners choices for participating independently.",
    xp: 15,
    hint: "Think about the barrier each one removes, rather than the exact shape of the ramp or setting."
  },

  // ============================================================
  // MISSION 4 — SECTION 3: Ergonomics
  // ============================================================
  {
    id: "m4-ergo-01",
    mission: 4,
    section: "Ergonomics",
    title: "Set Up for Comfort",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these habits into 'Healthy workspace habit' and 'Habit to avoid': feet flat on the floor, screen at a comfortable height, wrists bent sharply while typing, sitting far forward with no back support, elbows relaxed near a right angle, taking short movement breaks.",
    options: ["Feet flat on the floor", "Screen at a comfortable height", "Wrists bent sharply while typing", "Sitting far forward with no back support", "Elbows relaxed near a right angle", "Taking short movement breaks"],
    correctAnswer: {
      "Healthy workspace habit": ["Feet flat on the floor", "Screen at a comfortable height", "Elbows relaxed near a right angle", "Taking short movement breaks"],
      "Habit to avoid": ["Wrists bent sharply while typing", "Sitting far forward with no back support"]
    },
    explanation: "Ergonomics means arranging work so the body can stay comfortable and work safely. Feet supported, a comfortable screen height, relaxed elbows, and movement breaks can reduce strain; sharply bent wrists and unsupported sitting can create discomfort over time.",
    funFact: "Ergonomics is used far beyond computers — it also helps designers think about school desks, car seats, tools, and kitchen equipment.",
    realWorldExample: "Before a long homework session, adjusting a chair and placing the screen at a sensible height can make reading and typing more comfortable.",
    xp: 20,
    hint: "Choose habits that keep the body supported and relaxed, rather than held in an awkward position."
  },
  {
    id: "m4-ergo-02",
    mission: 4,
    section: "Ergonomics",
    title: "RSI Prevention",
    type: "drag-drop",
    difficulty: "easy",
    question: "Drag the best ending into the sentence: 'Taking regular short breaks and keeping a comfortable wrist position can help reduce the risk of ___. '",
    options: ["repetitive strain injury (RSI)", "a faster internet connection", "a new file extension", "a larger monitor"],
    correctAnswer: "repetitive strain injury (RSI)",
    explanation: "RSI means Repetitive Strain Injury. It can be linked to repeating the same movements in uncomfortable positions over a long time, so healthy posture, sensible setup, and short breaks are useful prevention habits.",
    funFact: "The word 'repetitive' matters: small movements can become a problem when they are repeated again and again without enough rest.",
    realWorldExample: "Someone who types, games, or uses a mouse for a long time can pause, stretch gently, and check their wrist position before discomfort builds up.",
    xp: 15,
    hint: "This is the term your class used for strain connected with repeated movements and poor long-term habits."
  },
  {
    id: "m4-ergo-03",
    mission: 4,
    section: "Ergonomics",
    title: "Scenario: The Aching Neck",
    type: "scenario",
    difficulty: "medium",
    question: "Angelo spends a long time looking down at a laptop on a very low table and his neck feels uncomfortable. What is the best first change to try?",
    options: [
      "Raise the screen to a more comfortable viewing height while keeping it stable",
      "Lean closer and keep working without a break",
      "Bend his wrists more sharply while typing",
      "Turn the brightness to zero so he cannot see the screen"
    ],
    correctAnswer: "Raise the screen to a more comfortable viewing height while keeping it stable",
    explanation: "Looking down for a long time can strain the neck. Raising a laptop safely to a more comfortable viewing height can help; if the laptop is raised for a longer setup, an external keyboard and mouse can keep the wrists comfortable too.",
    funFact: "Small changes to screen height can affect how much a person bends their neck over many minutes of reading.",
    realWorldExample: "At home, a learner might place a laptop on a stable stand or a few sturdy books, then use a separate keyboard if available.",
    xp: 20,
    hint: "Choose the option that improves the viewing position instead of adding another awkward posture."
  },
  {
    id: "m4-ergo-04",
    mission: 4,
    section: "Ergonomics",
    title: "Observation: A Healthy Desk",
    type: "hotspot",
    difficulty: "easy",
    question: "Imagine a computer desk setup. Click EVERY feature that supports a healthier working position.",
    options: ["Feet supported on the floor", "Screen at a comfortable viewing height", "Wrists kept as straight and relaxed as possible", "Shoulders raised tightly while typing", "No breaks during a long session"],
    correctAnswer: ["Feet supported on the floor", "Screen at a comfortable viewing height", "Wrists kept as straight and relaxed as possible"],
    explanation: "A healthy workspace supports the body: feet are supported, the screen can be viewed without excessive bending, and wrists stay relaxed. Tense shoulders and no breaks can make a long session more uncomfortable.",
    funFact: "There is no single perfect desk position for every body — comfort includes making sensible adjustments and changing position from time to time.",
    realWorldExample: "In a shared computer lab, even a quick chair-height check before starting can help a learner sit more comfortably.",
    xp: 15,
    hint: "Look for choices that let the body stay supported, relaxed, and able to move."
  },

  // ============================================================
  // MISSION 4 — END OF MISSION REFLECTION
  // ============================================================
  {
    id: "m4-reflect-01",
    mission: 4,
    section: "Mission 4 Reflection",
    title: "Your Smarter Computer Habit",
    type: "reflection",
    difficulty: "easy",
    question: "Choose one habit from this mission — a shortcut, an accessibility idea, or an ergonomic change. How could it help you or someone else in real life?",
    options: null,
    correctAnswer: null,
    explanation: "There is no single right choice. The important part is connecting one practical idea to a person and a real situation, because technology works best when it helps people do what matters to them.",
    funFact: "The best computer habit is often the one you can keep doing regularly, not the most complicated one.",
    realWorldExample: "You might decide to use Ctrl+S more often, turn on a helpful accessibility setting, or take a short stretch break during long typing tasks.",
    xp: 15,
    hint: "Pick one small action you could realistically use, then explain who it helps and why."
  },
  {
    id: "m4-reflect-02",
    mission: 4,
    section: "Mission 4 Reflection",
    title: "Teacher Feedback and Your Question",
    type: "reflection",
    difficulty: "easy",
    question: "What was most useful in this mission? What would you like to practise again? What question should your teacher answer next?",
    options: null,
    correctAnswer: null,
    explanation: "Great work completing Mission 4! Your feedback helps your teacher see which practical skills felt useful, which need more time, and what you are ready to explore next.",
    funFact: "Good technology lessons improve when learners share what worked for them and what still feels difficult.",
    realWorldExample: "Your question could lead to the next class practising a shortcut, exploring another accessibility tool, or improving a computer workspace together.",
    xp: 25,
    hint: "Be honest — useful feedback can include something you enjoyed, something that was confusing, and one question you still have."
  },

  // ============================================================
  // MISSION 5 — SECTION 1: Workspaces and Organisation
  // ============================================================
  {
    id: "m5-workspace-01",
    mission: 5,
    section: "Workspaces and Organisation",
    title: "Two Spaces, One Computer",
    type: "scenario",
    difficulty: "easy",
    question: "Angelo wants one clean space for homework and a separate space for games, without closing either activity. Which feature from class would help most?",
    options: ["Virtual Desktops (Workspaces)", "High Contrast", "Control Panel", "A search bar"],
    correctAnswer: "Virtual Desktops (Workspaces)",
    explanation: "Virtual Desktops, also called Workspaces, let you organise open apps into separate screen spaces on the same computer. Angelo could keep school work in one workspace and games in another, then switch between them when needed.",
    funFact: "People who work with many apps often use separate workspaces for different jobs, such as writing, research, and communication.",
    realWorldExample: "A student could keep a browser and document open for an assignment in one workspace, while leaving a music app or game in another workspace for later.",
    xp: 15,
    hint: "Think about the feature that creates more than one organised screen space without needing another computer."
  },
  {
    id: "m5-workspace-02",
    mission: 5,
    section: "Workspaces and Organisation",
    title: "Why Separate Workspaces Help",
    type: "hotspot",
    difficulty: "medium",
    question: "Click EVERY benefit of using different Virtual Desktops (Workspaces).",
    options: ["Keeping homework apps separate from games", "Reducing clutter when many apps are open", "Using different groups of apps for different tasks", "Making the computer permanently delete other apps", "Replacing the need to save work"],
    correctAnswer: ["Keeping homework apps separate from games", "Reducing clutter when many apps are open", "Using different groups of apps for different tasks"],
    explanation: "Workspaces help organise what is already open. They can reduce clutter and keep tasks separate, but they do not delete apps or replace saving your work. Organisation makes it easier to focus and return to a task.",
    funFact: "The same organising idea appears outside computers: people use separate exercise books, folders, and shelves for different subjects.",
    realWorldExample: "During revision, one workspace could hold a science presentation while another holds a browser with research for ICT.",
    xp: 15,
    hint: "Choose the ideas that make work easier to organise, not ideas that make files disappear or save themselves."
  },
  {
    id: "m5-workspace-03",
    mission: 5,
    section: "Workspaces and Organisation",
    title: "Practical Challenge: Plan Your Workspaces",
    type: "sorting",
    difficulty: "medium",
    question: "Sort these open apps into the workspace where they would make the most sense while Angelo is doing homework and taking a break.",
    options: ["Assignment document", "Research browser tab", "Calculator for homework", "Game", "Music player", "Chat with friends"],
    correctAnswer: {
      "Homework workspace": ["Assignment document", "Research browser tab", "Calculator for homework"],
      "Break workspace": ["Game", "Music player", "Chat with friends"]
    },
    explanation: "There can be more than one good way to organise a computer, but this arrangement keeps the homework tools together and the break activities together. The important idea is choosing a system that makes the current task clearer and easier to continue.",
    funFact: "A workspace is not a second computer. It is another organised view of the apps already running on the same computer.",
    realWorldExample: "Try creating another Virtual Desktop in class, move or open an app there, then switch back to compare the two spaces.",
    xp: 20,
    hint: "Put the apps needed to complete the assignment together, then put leisure apps in the other space."
  },

  // ============================================================
  // MISSION 5 — SECTION 2: Finding and Changing Settings
  // ============================================================
  {
    id: "m5-settings-01",
    mission: 5,
    section: "Finding and Changing Settings",
    title: "Where Would You Start?",
    type: "scenario",
    difficulty: "easy",
    question: "A student wants to change a common computer option but cannot remember exactly where it is. Which place would usually be the best first place to explore?",
    options: ["Settings", "A game", "The Recycle Bin", "A music player"],
    correctAnswer: "Settings",
    explanation: "Settings is usually the best first place for common modern computer options because it groups many controls in one easy-to-explore area. If an older or more detailed option is not there, Control Panel may still contain it.",
    funFact: "Settings and Control Panel can both lead to useful controls, but their layouts and history are different.",
    realWorldExample: "In class, open Settings and Control Panel side by side. Look for one area that seems related in both places, then notice how the screens are organised differently.",
    xp: 15,
    hint: "Choose the place designed for changing how the computer works."
  },
  {
    id: "m5-settings-02",
    mission: 5,
    section: "Finding and Changing Settings",
    title: "Settings and Control Panel",
    type: "matching",
    difficulty: "medium",
    question: "Match each place or idea to the best description.",
    options: [
      { place: "Settings", description: "A modern place to explore many common computer options" },
      { place: "Control Panel", description: "An older interface that still contains useful controls" },
      { place: "Both", description: "Can sometimes lead to related computer controls" },
      { place: "Search", description: "A quick way to help find an app, setting, or tool" }
    ],
    correctAnswer: "place-description pairs as listed",
    explanation: "Settings and Control Panel are related, but they are not exactly the same. Windows has changed gradually, so newer Settings screens exist alongside older Control Panel tools. Search can help locate either one, but Search is only a finding tool, not the main idea of the lesson.",
    funFact: "Keeping older controls can help people and organisations continue using tools they already understand.",
    realWorldExample: "If you cannot find a control in Settings, you can ask a good question, check the name of the feature, and explore whether Control Panel has a related option.",
    xp: 20,
    hint: "Think about whether each choice is a modern settings area, an older settings area, both, or a way to find things."
  },
  {
    id: "m5-settings-03",
    mission: 5,
    section: "Finding and Changing Settings",
    title: "Search Is a Helper",
    type: "true-false",
    difficulty: "easy",
    question: "True or False: Search can help you find an app or setting faster, but understanding what you are looking for is still important.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "This is true. Search can save time, especially when a computer has many menus. But it works best when you understand the goal: for example, knowing that you want a display or accessibility option gives you useful words to search for.",
    funFact: "Good search skills are really question skills: the clearer your words, the easier it is to find a useful result.",
    realWorldExample: "Instead of searching random words, a learner could search for 'high contrast' after noticing that text is difficult to see.",
    xp: 15,
    hint: "Search is useful, but it cannot decide your goal for you."
  },

  // ============================================================
  // MISSION 5 — SECTION 3: Technology Changes, Concepts Remain
  // ============================================================
  {
    id: "m5-concepts-01",
    mission: 5,
    section: "Technology Changes, Concepts Remain",
    title: "Old Ideas in New Software",
    type: "mcq",
    difficulty: "medium",
    question: "Why might a newer version of Windows still contain an older-looking interface such as Control Panel?",
    options: ["New software must never change", "Older tools can remain useful and help with compatibility", "Computers are unable to create new settings", "It is only there to make the screen confusing"],
    correctAnswer: "Older tools can remain useful and help with compatibility",
    explanation: "Software usually evolves gradually. Newer tools are added, while useful older parts may remain so people, devices, and programs can continue working. Seeing an older interface does not mean the computer has stopped improving.",
    funFact: "Many operating systems keep older technologies so that important programs and devices do not suddenly stop working after an update.",
    realWorldExample: "A school may use a program that was designed for an older interface, so keeping some familiar controls can make the transition smoother.",
    xp: 20,
    hint: "Think about what could happen if every older tool disappeared the moment a new version arrived."
  },
  {
    id: "m5-concepts-02",
    mission: 5,
    section: "Technology Changes, Concepts Remain",
    title: "A Gradual Upgrade",
    type: "ordering",
    difficulty: "medium",
    question: "Put this sensible learning approach in order when a computer tool changes.",
    options: ["Use the new tool for the task", "Understand the goal of the task", "Explore where the new tool keeps related controls", "Ask a clear question if you get stuck"],
    correctAnswer: ["Understand the goal of the task", "Explore where the new tool keeps related controls", "Use the new tool for the task", "Ask a clear question if you get stuck"],
    explanation: "Start with the goal, not with a button. Next explore how the new tool is organised, then use it for the task. If you still need help, ask a clear question about the goal or the feature. This approach stays useful even when screens and menu names change.",
    funFact: "Professional computer users often learn new software by looking for familiar concepts, such as files, settings, sharing, or accessibility, rather than memorising every menu first.",
    realWorldExample: "When a phone app updates, you can first decide what you want to do, look for the related area, try it, and then ask for help using the correct idea.",
    xp: 20,
    hint: "Begin with what you are trying to achieve, then explore the new layout before asking for help."
  },
  {
    id: "m5-concepts-03",
    mission: 5,
    section: "Technology Changes, Concepts Remain",
    title: "Buttons Change, Ideas Travel",
    type: "guess-reveal",
    difficulty: "medium",
    question: "You begin using a brand-new operating system. Which learning habit will help you most? Make your guess, then reveal the answer.",
    options: ["Understand ideas such as organising work, changing settings, and finding help", "Memorise the exact position of every Windows button", "Avoid trying any unfamiliar tool", "Assume every new system works exactly like the old one"],
    correctAnswer: "Understand ideas such as organising work, changing settings, and finding help",
    explanation: "Understanding concepts travels with you. The names, icons, and menu positions may change, but computers still need ways to organise work, adjust settings, support different users, and find information. Memorising one screen can help for a short time; understanding the idea helps for much longer.",
    funFact: "The best computer users are not people who know every button by heart. They are people who can explore calmly, recognise patterns, and ask useful questions.",
    realWorldExample: "If a new tablet has no familiar Windows Start button, you can still look for the idea you need: apps, settings, search, workspaces, or accessibility.",
    xp: 20,
    hint: "Choose the habit that will still work after the names and buttons have changed."
  },

  // ============================================================
  // MISSION 5 — SECTION 4: Accessibility and Good Questions
  // ============================================================
  {
    id: "m5-access-01",
    mission: 5,
    section: "Accessibility and Good Questions",
    title: "Making Text Easier to See",
    type: "scenario",
    difficulty: "easy",
    question: "A person finds it hard to read text because the colours on the screen blend together. Which feature from class could help make the content easier to see?",
    options: ["High Contrast", "Virtual Desktop", "Custom application shortcut", "A game controller"],
    correctAnswer: "High Contrast",
    explanation: "High Contrast changes the screen colours so text and important parts stand out more clearly. It is an accessibility feature: computers can be adjusted because different people see and use screens in different ways.",
    funFact: "Accessibility features often help many people, not only people with disabilities. Stronger contrast can also be helpful in bright sunlight or when a screen is difficult to see.",
    realWorldExample: "In class, try locating where High Contrast can be enabled. You do not need to keep it on; the important thing is knowing that the option exists and what problem it can help solve.",
    xp: 15,
    hint: "Look for the feature that changes colours so words and screen parts stand out more clearly."
  },
  {
    id: "m5-access-02",
    mission: 5,
    section: "Accessibility and Good Questions",
    title: "Ask a Better Question",
    type: "mcq",
    difficulty: "medium",
    question: "Which question would help a student get the most useful support when text is difficult to see?",
    options: ["Computer help?", "Why is this computer bad?", "Where can I find a display or accessibility setting that makes text easier to see?", "Can someone do my work for me?"],
    correctAnswer: "Where can I find a display or accessibility setting that makes text easier to see?",
    explanation: "A good question explains the problem and the goal. This question says that text is difficult to see and asks for a relevant type of setting. Clear questions help teachers, classmates, search tools, and support pages give better answers.",
    funFact: "Researchers often improve a question several times before searching, because a precise question usually leads to more precise information.",
    realWorldExample: "Instead of saying 'I cannot find it,' try saying what you want to change and what you have already checked.",
    xp: 20,
    hint: "Choose the question that clearly states both the problem and the kind of help needed."
  },
  {
    id: "m5-reflect-01",
    mission: 5,
    section: "Mission 5 Reflection",
    title: "What Stayed With You?",
    type: "reflection",
    difficulty: "easy",
    question: "What surprised you most today: workspaces, Settings and Control Panel, older tools inside newer software, High Contrast, or asking good questions? Explain why.",
    options: null,
    correctAnswer: null,
    explanation: "There is no single correct answer. The important part is noticing an idea from today's class and explaining why it stood out to you. Curiosity is useful because it helps you explore technology instead of being afraid when something looks new.",
    funFact: "Many useful discoveries in technology begin with someone noticing a small difference and asking, 'Why does it work this way?'",
    realWorldExample: "Your answer might mention that two workspaces can reduce clutter, that Control Panel has not completely disappeared, or that High Contrast can make a screen easier to read.",
    xp: 15,
    hint: "Choose one demonstration you remember clearly, then describe what it made you realise."
  },
  {
    id: "m5-reflect-02",
    mission: 5,
    section: "Mission 5 Reflection",
    title: "The Idea Behind the Tool",
    type: "reflection",
    difficulty: "medium",
    question: "Why is learning computer concepts useful when software changes? Give one example from today's class.",
    options: null,
    correctAnswer: null,
    explanation: "The best computer users do not simply memorise tools — they understand the ideas behind them. When tools change, their understanding stays useful. Your example could be organising workspaces, finding settings, improving visibility with High Contrast, or asking a good question to explore something new.",
    funFact: "Software changes often, but ideas such as organisation, accessibility, compatibility, and problem-solving remain valuable across many devices.",
    realWorldExample: "If a future computer has a different-looking settings app, you can still recognise the concept of changing how the computer works and explore from there.",
    xp: 25,
    hint: "Name one idea that would still help you even if the buttons, colours, or menu names changed."
  },

  // ============================================================
  // MISSION 6 — Files: Names, Formats & Identity
  // A classroom-discovery mission: observe, predict, test, explain, reflect.
  // ============================================================
  {
    id: "m6-review-01", mission: 6, section: "Quick Review: Task Manager", title: "Practical Challenge: Open Task Manager", type: "ordering", difficulty: "easy",
    question: "Before today's file investigation, recreate the shortcut your class used. Put the actions in order.",
    options: ["Task Manager opens", "Press Esc while still holding Ctrl and Shift", "Hold Ctrl and Shift"],
    correctAnswer: ["Hold Ctrl and Shift", "Press Esc while still holding Ctrl and Shift", "Task Manager opens"],
    explanation: "Ctrl+Shift+Esc opens Task Manager directly. It is useful because it lets you inspect what is happening before making a decision.", funFact: "Task Manager is an observer first: it shows information about running apps and resources.", realWorldExample: "Use it with your teacher when an app stops responding; do not end tasks just because they look unfamiliar.", xp: 15, hint: "Hold the two modifier keys before pressing Esc.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-003", "COMP-006"], activityIds: ["ACT-005"], learningObjective: "Learner can open Task Manager using Ctrl+Shift+Esc.", cognitiveLevel: "Apply", instructionalStrategy: "STR-011", tags: ["task-manager", "shortcut", "practical"] })
  },
  {
    id: "m6-review-02", mission: 6, section: "Quick Review: Task Manager", title: "Guess Before Reveal: Frozen App", type: "guess-reveal", difficulty: "medium",
    question: "A document app has stopped responding, but the rest of the computer still works. What is the safest first investigation? Make your best guess before revealing the explanation.",
    options: ["Open Task Manager and identify the app that is not responding", "Immediately switch off the computer at the wall", "End every process you can see", "Delete the document app"],
    correctAnswer: "Open Task Manager and identify the app that is not responding",
    explanation: "Start by observing the specific problem. Task Manager can help identify the frozen app; only then should an adult or teacher decide whether ending that one task is appropriate.", funFact: "A frozen window does not always mean the whole computer has failed.", realWorldExample: "This is the same careful habit you will use with files today: investigate before you act.", xp: 20, hint: "Choose the option that gathers information without making a risky change.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-006", "COMP-014"], misconceptionIds: ["MIS-003"], activityIds: ["ACT-005"], learningObjective: "Learner can choose a safe first response to one frozen application.", cognitiveLevel: "Apply", instructionalStrategy: "STR-001", tags: ["task-manager", "frozen-app", "prediction"] })
  },
  {
    id: "m6-review-03", mission: 6, section: "Quick Review: Task Manager", title: "Teacher Echo: End One Task, Not Everything", type: "mcq", difficulty: "easy",
    question: "Complete the classroom reminder: “Task Manager helps us identify the problem first; we only end the ___ that is causing the problem.”",
    options: ["specific app or task", "whole computer", "internet", "every running process"], correctAnswer: "specific app or task",
    explanation: "Ending a specific unresponsive task can be useful, but ending everything can interrupt important system work or lose work in other apps.", funFact: "Some processes belong to Windows itself, which is why random ending is unsafe.", realWorldExample: "Say the reminder aloud with a partner before trying it on a classroom computer.", xp: 15, hint: "The safe choice is narrow and targeted.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-006", "COMP-014"], misconceptionIds: ["MIS-003"], activityIds: ["ACT-005"], learningObjective: "Learner can state the safe scope of an End Task action.", cognitiveLevel: "Understand", instructionalStrategy: "STR-002", tags: ["task-manager", "teacher-echo", "safety"] })
  },
  {
    id: "m6-review-04", mission: 6, section: "Quick Review: Task Manager", title: "Match the Resource Clue", type: "matching", difficulty: "medium",
    question: "Match each Task Manager clue to what it describes.",
    options: [
      { clue: "CPU", meaning: "How much processing work is being used" },
      { clue: "Memory", meaning: "How much working memory apps are using" },
      { clue: "Disk", meaning: "How busy storage is reading or writing" }
    ], correctAnswer: "clue-meaning pairs as listed",
    explanation: "Resource figures are clues, not automatic diagnoses. They help you notice what the computer is busy doing and ask a better next question.", funFact: "A high number can be normal when a large file is opening or saving.", realWorldExample: "If a class computer is slow, observe which resource is busy before guessing at a solution.", xp: 20, hint: "Think about processing, working space, and saved storage.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-006", "COMP-012"], activityIds: ["ACT-005"], learningObjective: "Learner can interpret basic CPU, memory, and disk resource labels.", cognitiveLevel: "Understand", instructionalStrategy: "STR-007", tags: ["task-manager", "resources", "matching"] })
  },
  {
    id: "m6-review-05", mission: 6, section: "Quick Review: Task Manager", title: "Sort: Safe or Risky Troubleshooting", type: "sorting", difficulty: "medium",
    question: "Sort these responses to a frozen app into “Safe first step” and “Risky action”.",
    options: ["Observe which app is frozen", "Ask a teacher before ending an unfamiliar task", "End every process at once", "Pull the power cable immediately"],
    correctAnswer: { "Safe first step": ["Observe which app is frozen", "Ask a teacher before ending an unfamiliar task"], "Risky action": ["End every process at once", "Pull the power cable immediately"] },
    explanation: "Good troubleshooting is careful and specific. Observe, identify, and ask for support when needed; broad or sudden actions can create a bigger problem and lose work.", funFact: "Troubleshooters often keep notes of what they observed before changing anything.", realWorldExample: "This is a useful rule for files too: do not rename, delete, or force-open something until you have looked for clues.", xp: 20, hint: "Safe actions collect information or ask for help; risky actions affect too much too quickly.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-006", "COMP-014"], misconceptionIds: ["MIS-003"], activityIds: ["ACT-005"], learningObjective: "Learner can distinguish safe observation-led troubleshooting from risky actions.", cognitiveLevel: "Analyse", instructionalStrategy: "STR-008", tags: ["task-manager", "safe-troubleshooting", "sorting"] })
  },
  {
    id: "m6-review-06", mission: 6, section: "Quick Review: Task Manager", title: "Scenario: Preserve the Work", type: "scenario", difficulty: "medium",
    question: "A browser has frozen while a classmate is typing in a different app. Why is “End Task” for the browser safer than restarting the whole computer straight away?",
    options: ["It targets the problem app and may protect work in other apps", "It makes all files permanently disappear", "It gives the browser more internet data", "It repairs every computer problem"], correctAnswer: "It targets the problem app and may protect work in other apps",
    explanation: "Targeting one confirmed problem limits disruption. It still may lose unsaved work in that app, so it should be used thoughtfully and with support when needed.", funFact: "Many programs have their own recovery tools, but saving work regularly is still the best protection.", realWorldExample: "Before ending a task in class, tell your teacher what you observed and which app you think is affected.", xp: 20, hint: "Think about which choice changes the smallest possible part of the computer.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-006", "COMP-014", "COMP-013"], misconceptionIds: ["MIS-003"], activityIds: ["ACT-005"], learningObjective: "Learner can explain why targeted troubleshooting is safer than a broad restart.", cognitiveLevel: "Apply", instructionalStrategy: "STR-006", tags: ["task-manager", "scenario", "safe-troubleshooting"] })
  },

  // ------------------------------------------------------------
  // SECTION B — Today's Main Discovery: classroom file experiments
  // ------------------------------------------------------------
  {
    id: "m6-files-01", mission: 6, section: "Today's Main Discovery: Files", title: "Observe First: Three Familiar-Looking Files", type: "guess-reveal", difficulty: "easy",
    question: "In class, the teacher showed three files named holiday.jpg, holiday.txt, and holiday.docx. Before opening any of them, what is the dot-and-letters part most useful for predicting?",
    options: ["The file format and a likely app to open it", "Who created the file", "Whether the file is safe forever", "The exact words or picture inside"], correctAnswer: "The file format and a likely app to open it",
    explanation: "The extension is a helpful clue about a file’s format and the kind of reader that may open it. It does not reveal every detail of the content.", funFact: "Windows can be set to hide extensions, which makes careful investigation even more important.", realWorldExample: "The class first observed names and extensions, then tested what happened when each file was opened.", xp: 15, hint: "A name is a clue, not a full description.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-006"], activityIds: ["ACT-002"], learningObjective: "Learner can predict what an extension suggests about a file.", cognitiveLevel: "Understand", instructionalStrategy: "STR-001", tags: ["files", "extensions", "observation", "prediction"] })
  },
  {
    id: "m6-files-02", mission: 6, section: "Today's Main Discovery: Files", title: "Prediction: Change the Label?", type: "guess-reveal", difficulty: "medium",
    question: "Before the classroom experiment, predict what happens if notes.txt is renamed notes.jpg without changing anything else inside the file.",
    options: ["It becomes a real photograph", "Its label changes, but its text content does not turn into image data", "It becomes a website", "Every app can now open it"], correctAnswer: "Its label changes, but its text content does not turn into image data",
    explanation: "Renaming an extension changes a label, not the underlying format. A photo reader may reject the renamed text file because the contents do not match what that reader expects.", funFact: "File conversion tools create a new format by changing or re-encoding the contents, not merely by changing a name.", realWorldExample: "This is why the class made a copy before experimenting: investigating should not damage the original work.", xp: 25, hint: "Ask whether changing a label can rewrite all the data inside.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-001"], activityIds: ["ACT-002"], learningObjective: "Learner can predict the difference between renaming a file and converting its format.", cognitiveLevel: "Analyse", instructionalStrategy: "STR-001", tags: ["files", "extensions", "prediction", "misconception"] })
  },
  {
    id: "m6-files-03", mission: 6, section: "Today's Main Discovery: Files", title: "Classroom Experiment: Rename a Copy", type: "scenario", difficulty: "medium",
    question: "Your group copied a text file, renamed the copy with .jpg, then tried to open it in an image viewer. The viewer says it cannot read the file. What is the best explanation?",
    options: ["The content is still text, even though the copy now has an image-looking label", "The computer has turned off", "The image viewer can read every format", "The original text file has become a photograph"], correctAnswer: "The content is still text, even though the copy now has an image-looking label",
    explanation: "The experiment reveals that a label and the underlying information are not the same thing. The viewer expects image data; the copied file still contains text data.", funFact: "Programs often inspect more than an extension when deciding whether they can read a file.", realWorldExample: "Always experiment on a copy, exactly as your group did, so the original remains safe.", xp: 25, hint: "Remember what was actually changed in the experiment.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007", "COMP-014"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-001", "MIS-002"], activityIds: ["ACT-002"], learningObjective: "Learner can explain the result of a safe extension-renaming experiment.", cognitiveLevel: "Analyse", instructionalStrategy: "STR-005", tags: ["files", "experiment", "format", "safe-practice"] })
  },
  {
    id: "m6-files-04", mission: 6, section: "Today's Main Discovery: Files", title: "Teacher Echo: Names Help, Understanding Confirms", type: "mcq", difficulty: "easy",
    question: "Complete today’s class idea: “A file name helps us recognise something; checking its ___ helps us know what it really is.”",
    options: ["format and content", "screen colour", "owner’s favourite app", "folder icon only"], correctAnswer: "format and content",
    explanation: "Names and extensions are useful starting clues. Opening a file appropriately and checking its content and format gives stronger evidence.", funFact: "Two files can have similar names but contain completely different information.", realWorldExample: "Repeat this sentence before your group sorts the next set of classroom files.", xp: 15, hint: "The answer should explain what is inside, not just what is written on the label.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-006"], activityIds: ["ACT-002"], learningObjective: "Learner can state the Mission 6 Big Idea about file identity.", cognitiveLevel: "Understand", instructionalStrategy: "STR-002", tags: ["files", "teacher-echo", "big-idea"] })
  },
  {
    id: "m6-files-05", mission: 6, section: "Today's Main Discovery: Files", title: "Match Format to Reader", type: "matching", difficulty: "easy",
    question: "Match each classroom file format to a likely reader.",
    options: [
      { format: ".jpg image", reader: "Photo or image viewer" },
      { format: ".mp3 audio", reader: "Music or media player" },
      { format: ".docx document", reader: "Word processor" },
      { format: ".pdf document", reader: "PDF reader" }
    ], correctAnswer: "format-reader pairs as listed",
    explanation: "A reader is an application that understands a particular kind of stored information. One app may support several formats, but no app automatically understands every possible format.", funFact: "A PDF is designed to preserve a page’s layout across many devices.", realWorldExample: "Notice which app Windows suggests when you double-click each classroom sample file.", xp: 20, hint: "Match the type of information to the app built to read it.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007", "COMP-002"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-002"], activityIds: ["ACT-002"], learningObjective: "Learner can match common file formats to appropriate reader applications.", cognitiveLevel: "Understand", instructionalStrategy: "STR-007", tags: ["files", "formats", "readers", "matching"] })
  },
  {
    id: "m6-files-06", mission: 6, section: "Today's Main Discovery: Files", title: "Sort: Label Clue or Stronger Evidence?", type: "sorting", difficulty: "medium",
    question: "Sort each observation into “Label clue” or “Stronger evidence about the file”.",
    options: ["The file is named science.jpg", "The extension shown is .jpg", "An image viewer successfully displays a photograph", "Opening the file shows a page of typed notes"],
    correctAnswer: { "Label clue": ["The file is named science.jpg", "The extension shown is .jpg"], "Stronger evidence about the file": ["An image viewer successfully displays a photograph", "Opening the file shows a page of typed notes"] },
    explanation: "Names and extensions help us predict. Observing how the contents behave in an appropriate reader gives stronger evidence of what the file really contains.", funFact: "Investigators use several clues together rather than trusting only one label.", realWorldExample: "Your class did this when it compared the renamed copy with the original file.", xp: 25, hint: "Which observations show what the file actually does or contains?",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007", "COMP-014"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-001", "MIS-006"], activityIds: ["ACT-002"], learningObjective: "Learner can distinguish file labels from evidence obtained by investigating content.", cognitiveLevel: "Analyse", instructionalStrategy: "STR-008", tags: ["files", "identity", "sorting", "evidence"] })
  },
  {
    id: "m6-files-07", mission: 6, section: "Today's Main Discovery: Files", title: "Operating System Association", type: "scenario", difficulty: "medium",
    question: "On one classroom computer, double-clicking a .pdf opens a PDF reader. On another, it opens a web browser. What does this show?",
    options: ["The operating system can associate the same format with different suitable reader apps", "The file has changed into a website", "A PDF can only ever be opened one way", "The name decides which app is installed"], correctAnswer: "The operating system can associate the same format with different suitable reader apps",
    explanation: "An operating system uses file associations to choose a default app. The association can vary by computer while the underlying file format remains the same.", funFact: "You can often choose “Open with” to use another compatible app without changing the file itself.", realWorldExample: "Observe the suggested app on your own classroom computer instead of assuming every screen will match a friend’s.", xp: 25, hint: "Focus on the difference between the file format and the computer’s chosen app.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-002", "COMP-007"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-002"], activityIds: ["ACT-002"], learningObjective: "Learner can explain an operating system’s file association as a default reader choice.", cognitiveLevel: "Apply", instructionalStrategy: "STR-006", tags: ["files", "operating-system", "associations", "scenario"] })
  },
  {
    id: "m6-files-08", mission: 6, section: "Today's Main Discovery: Files", title: "Practical Challenge: Choose a Safe Next Step", type: "mcq", difficulty: "medium",
    question: "You receive a file called holiday_photo.jpg, but Windows warns that the type is unfamiliar and it will not open in an image viewer. What is the safest next step?",
    options: ["Pause, inspect the file details or ask a teacher before opening it with another app", "Rename it repeatedly until it opens", "Assume it is definitely a photo because of its name", "Run every application until one accepts it"], correctAnswer: "Pause, inspect the file details or ask a teacher before opening it with another app",
    explanation: "When clues disagree, pause and investigate. A name alone is not enough evidence, and trying random apps or changing labels can create confusion or risk.", funFact: "Good digital investigators treat unexpected warnings as useful information, not something to ignore.", realWorldExample: "In class, show the teacher the filename, extension, and warning instead of guessing.", xp: 25, hint: "Choose the response that gathers evidence and keeps the computer safe.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007", "COMP-013", "COMP-014"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-001", "MIS-006"], activityIds: ["ACT-002"], learningObjective: "Learner can choose a safe response when a file’s label and behaviour disagree.", cognitiveLevel: "Apply", instructionalStrategy: "STR-011", tags: ["files", "safe-practice", "practical-challenge", "identity"] })
  },
  {
    id: "m6-files-09", mission: 6, section: "Today's Main Discovery: Files", title: "Reflection: Digital Investigator", type: "reflection", difficulty: "medium",
    question: "You’ve become a Digital Investigator. Describe one clue you would check before deciding what an unfamiliar file really is, and explain why you would not trust its name alone.",
    options: null, correctAnswer: null,
    explanation: "Computers do not simply trust labels: they use clues such as formats, file associations, and whether a suitable reader can understand the information. Great learners do the same — they observe, investigate, and then decide.", funFact: "The most useful discoveries often begin with a careful question: “What evidence do I have?”", realWorldExample: "Today’s discovery: Names help us recognise things. Understanding helps us know what they really are.", xp: 25, hint: "You could mention an extension, file details, the content, or a compatible reader.",
    learningIntelligence: m6LIL({ competencyIds: ["COMP-007", "COMP-014"], bigIdeaIds: ["BIG-003"], misconceptionIds: ["MIS-001", "MIS-002", "MIS-006"], activityIds: ["ACT-002"], learningObjective: "Learner can reflect on an evidence-based approach to file identity.", cognitiveLevel: "Evaluate", instructionalStrategy: "STR-003", questionPurpose: "metacognitive-reflection", tags: ["files", "reflection", "digital-investigator", "big-idea"] })
  }

];

// ============================================================
// GAMIFICATION CONFIG
// ============================================================
const gamification = {
  xpPerLevel: 150,
  badges: [
    { id: "input-master", label: "Input Master", criteria: "Complete all Input section items correctly" },
    { id: "binary-decoder", label: "Binary Decoder", criteria: "Complete all Binary section items correctly" },
    { id: "myth-buster", label: "Myth Buster", criteria: "Correctly answer the .com vs file extension and RAM vs ROM items" },
    { id: "mission-1-complete", label: "Computer Fundamentals Graduate", criteria: "Finish all Mission 1 items" },
    { id: "mission-2-complete", label: "Windows Navigator", criteria: "Finish all Mission 2 items" },
    { id: "shortcut-sprinter", label: "Shortcut Sprinter", criteria: "Complete all Keyboard Shortcuts section items correctly" },
    { id: "mission-3-complete", label: "Keyboard Commander", criteria: "Finish all Mission 3 items" },
    { id: "mission-4-complete", label: "Smart Computer User", criteria: "Finish all Mission 4 items" },
    { id: "mission-5-complete", label: "Digital Problem Solver", criteria: "Finish all Mission 5 items" },
    { id: "mission-6-complete", label: "Digital Investigator", criteria: "Finish all Mission 6 items" }
  ],
  encouragingMessages: {
    correct: {
      general: [
        "Correct — you used the key idea well.",
        "Well done — that shows careful thinking.",
        "Yes! You connected the clue to the right concept.",
        "Strong answer — keep building on that understanding."
      ],
      selection: [
        "Good choice — you identified the best answer.",
        "Correct — you ruled out the distractors and found the key idea.",
        "Nice decision-making — that option fits the situation."
      ],
      arrangement: [
        "Well organised — the relationships are in the right places.",
        "Correct — you sorted the clues using the right rule.",
        "Nice work — each part now connects where it belongs."
      ],
      written: [
        "Correct — your answer uses the right term or value.",
        "Good work checking the details before you answered.",
        "Exactly — you completed the missing piece accurately."
      ],
      reflection: [
        "Thanks for sharing your thinking — reflection helps learning stick.",
        "That is a useful connection to make from your own experience.",
        "Good reflection — noticing what helps you is an important skill."
      ]
    },
    retry: {
      general: [
        "Not quite yet — use the explanation to strengthen the idea.",
        "A useful attempt — check the key clue and try to spot the difference.",
        "Keep going — mistakes can show exactly what to practise next."
      ],
      selection: [
        "Not quite — compare each option with the main clue in the question.",
        "Look again at what the situation needs, not just a familiar word."
      ],
      arrangement: [
        "Almost there — check the rule for each item or step again.",
        "Review how the parts connect, then use the explanation as a guide."
      ],
      written: [
        "Check the wording, spelling, or calculation against the clue.",
        "Try breaking the answer into smaller steps before checking it again."
      ]
    }
  },
  confettiOnMissionComplete: true,
  progressBar: true
};

module.exports = { missionContent, gamification };

// Mission-level learning data is consumed by the renderer only when present;
// it leaves every earlier mission's existing display unchanged.
var missionDetails = {
  6: {
    title: "Files: Names, Formats & Identity",
    bigIdeaId: "BIG-003",
    completionTitle: "You've become a Digital Investigator.",
    completionInsight: "Today's discovery: Computers don't simply trust labels. They investigate information. Great learners do the same."
  }
};

// Mission 6 is authored directly against the LIL contract. The helper keeps
// each item explicit while avoiding duplicate mission-level context.
function m6LIL(overrides) {
  return Object.assign({
    competencyIds: ["COMP-007"],
    bigIdeaIds: ["BIG-003"],
    misconceptionIds: [],
    activityIds: ["ACT-002"],
    learningObjective: "Learner can investigate a file using names, formats, and compatible readers.",
    cognitiveLevel: "Understand",
    instructionalStrategy: "STR-004",
    questionPurpose: "formative-practice",
    classroomOrigin: { source: "ILIMNI classroom file investigation", mission: 6, section: "Files: Names, Formats & Identity" },
    difficulty: "medium",
    estimatedTime: 90,
    tags: ["mission-6", "files", "names-formats-identity"]
  }, overrides || {});
}
