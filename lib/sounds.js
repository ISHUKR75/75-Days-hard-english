// Simple English: This file plays sound effects for correct/wrong answers and gamification.
// Simple English: It is safe for Next.js Server-Side Rendering (SSR) because it checks if the code is running in the browser.

// Simple English: Function to play a sound file by its name.
export function playSound(soundName) {
  // Simple English: Verify if the window object is defined (which means we are in the browser, not the server).
  if (typeof window !== 'undefined') {
    try {
      // Simple English: Create a new Audio object using the sound file's path from the public folder.
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      
      // Simple English: Set the volume level to 60% so it is not too loud for the user.
      audio.volume = 0.6;
      
      // Simple English: Start playing the audio file immediately.
      audio.play().catch((error) => {
        // Simple English: Log the error in the console if the browser blocks audio play due to user interaction policy.
        console.log("Audio play blocked or failed:", error.message);
      });
    } catch (e) {
      // Simple English: Log any general errors that happen during audio object creation.
      console.error("Failed to create Audio object:", e);
    }
  }
}

// Simple English: Play the success sound for correct answers.
export const playCorrect = () => playSound('correct');

// Simple English: Play the error sound for wrong answers.
export const playWrong = () => playSound('wrong');

// Simple English: Play the fanfare sound when a user completes a level.
export const playLevelUp = () => playSound('level-up');

// Simple English: Play the sound when a user earns coins.
export const playCoin = () => playSound('coin');

// Simple English: Play the congratulations sound for a perfect quiz score.
export const playPerfectScore = () => playSound('perfect-score');

// Simple English: Play the sound when unlocking a new badge achievement.
export const playAchievement = () => playSound('achievement');
