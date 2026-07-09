/**
 * ILIMNI — Computer Appreciation Review Experience
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
    type: "sorting",
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
    { id: "mission-2-complete", label: "Windows Navigator", criteria: "Finish all Mission 2 items" }
  ],
  encouragingMessages: [
    "Nice thinking — that's exactly the kind of reasoning that sticks.",
    "Even if that wasn't quite right, you're closer than you think.",
    "You just cleared up a mix-up a lot of learners never notice!",
    "That's the kind of question real computer scientists ask too."
  ],
  confettiOnMissionComplete: true,
  progressBar: true
};

module.exports = { missionContent, gamification };
