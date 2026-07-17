# Educational Fidelity Audit — EF-001

## Evidence used

No standalone Teacher Classroom Report, teacher correction, handbook, or curriculum file was present in this workspace. The available classroom evidence is the explicit Mission 6 file activity in `content.js`: learners observed named files, renamed a copy, and compared the result with the original. Mission 6 is therefore the only mission for which the repository records classroom events directly.

All other existing mission questions remain in place because this sprint does not author new content or change the curriculum. Where a learner-facing sentence claimed an event, identity, or broad learning outcome beyond the available evidence, it was removed or made narrower.

## Issues and implemented replacements

| Location | Why this violated fidelity | Original wording | Replacement wording | Reason for replacement |
| --- | --- | --- | --- | --- |
| `content.js` Mission 6 completion title | Completion of activities does not demonstrate a new learner identity. | “You've become a Digital Investigator.” | “You completed today's file investigation.” | States the completed lesson, not a status the learner has not demonstrated. |
| `content.js` Mission 6 completion insight | Claimed computers and learners “investigate” in a philosophical way, rather than naming the recorded activity. | “Today's discovery: Computers don't simply trust labels. They investigate information. Great learners do the same.” | “You explored how file names, formats, and contents can give different clues.” | Summarises the file activity in accessible language. |
| `content.js` Mission 6 reflection title | Assigns the unsupported “Digital Investigator” identity. | “Reflection: Digital Investigator” | “Reflection: Checking File Clues” | Names the classroom activity. |
| `content.js` Mission 6 reflection prompt | The opening identity claim overstated achievement. | “You’ve become a Digital Investigator...” | “Think about the file activity. Name one clue you checked...” | The question can be answered from the recorded file activity. |
| `content.js` Mission 6 reflection explanation and example | Expanded the lesson into an identity and a general claim about how “great learners” behave. | “Great learners do the same...” | “In this activity, the file name and extension were starting clues...” | Keeps the reflection tied to what the activity asked learners to do. |
| `learning-intelligence/big-ideas.js` Big Idea registry | Five Big Ideas were broad philosophical statements with no classroom-event evidence. They could appear as “Today’s Big Idea” even when unrelated to the current lesson. | BIG-001, BIG-002, BIG-004, BIG-005, and BIG-006 | Only the evidence-backed BIG-003 remains. | Removes unsupported generated ideas instead of inventing a classroom origin. |
| `learning-intelligence/big-ideas.js` BIG-003 | The old statement was inspirational and overgeneralised the class activity. | “Names identify. Understanding reveals.” | “A file name gives a clue; the format and contents give more information.” | Uses the exact kind of comparison learners made in the recorded activity. |
| `content.js` active badge labels | “Explorer” and “Strategist” are identity-level recognition labels, not records of a completed activity. | “Input Explorer”, “Binary Explorer”, “Task Manager Explorer”, “Shortcut Strategist” | “Input activities completed”, “Binary activities completed”, “Mission 6 activities completed”, “Keyboard shortcut activities completed” | Badges now describe only what their existing criteria record. |
| `app.js` Learning Journey recognition event | “Learning achievement” may imply validated competence beyond the badge condition. | “A learning achievement has been added to your journey.” | “This recognition records completed activities.” | Accurately describes the existing recognition mechanism. |
| `app.js` Learning Journey mission event | “Every learning activity” characterises all listed items as learning that happened in class. | “You completed every learning activity in this mission.” | “You completed the activities in this mission.” | Describes platform completion without claiming classroom history. |
| `app.js` Weekend Activity event | Claimed the optional activity connected to classroom learning without evidence. | “A short computer-lab mystery that connects classroom learning with review.” | “An optional short keyboard activity.” | Removes the unsupported classroom connection. |
| `index.html` journey and growth copy | Claimed the interface could state “what you have learned” rather than what it actually records. | “what you have learned”; “earn achievements” | “completed activities”; “Track the activities you have completed.” | Keeps progress language observable and verifiable. |
| `index.html` learning-path endpoint | “Master” implies mastery that has not been assessed. | “Explore, Learn, Practice, Reflect, Master” | “Explore, Learn, Practice, Reflect, Continue” | Avoids premature mastery language. |
| `weekend-treat.js` introduction | Invented a principal, training centre, lab incident, and learner role as though they were real events. | “Principal at WEB79 ICT Training Centre...” | “Try these keyboard and computer practice activities...” | Keeps the optional interaction without presenting fictional events as classroom history. |
| `weekend-treat.js` completion, badge, and certificate | Assigned “Keyboard Detective,” claimed a solved lab mystery, and claimed a whole week of revised skills. | “Keyboard Detective”; “revised a whole week...” | “Keyboard Practice Activity”; “you completed this keyboard practice activity.” | Records the optional activity only; no identity or unverified learning claim remains. |

## Deliberately retained

- Question content and existing mission functionality were not redesigned or removed.
- The archived recognition records remain in `archivedRecognitionBadges`; they are not active learner-facing badges.
- The single remaining Big Idea is tied to the recorded Mission 6 file activity.

## Follow-up requirement

Before certifying Missions 1–5 as classroom-faithful, add their Teacher Classroom Reports or teacher corrections to the repository. Without those sources, the platform cannot prove that individual examples, fun facts, and real-world scenarios were part of those classes.
