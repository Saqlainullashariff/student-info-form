// 1. IMPORTANT: Replace this with your actual API Gateway URL:
const apiUrl = 'API-KEY';

const form = document.getElementById('form');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Gather form data
  const name = document.getElementById('name').value;
  const usn = document.getElementById('usn').value;
  const college = document.getElementById('college').value;
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;

  // UX feedback during submission
  msg.style.display = 'block';
  msg.textContent = 'Sending...';
  msg.className = '';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        USN: usn, // <-- FIX #1: Changed 'usn' to 'USN' to match Lambda
        college,
        email,
        mobile
      })
    });

    const data = await res.json();
    
    // <-- FIX #2: Changed 'data.id' to 'data.submissionId'
    if (res.ok && data.submissionId) { 
      msg.textContent = `Done! Submission ID: ${data.submissionId}`;
      msg.className = 'ok';
      form.reset();
    } else {
      // Show backend error message if present
      msg.textContent = data.error 
        ? `Error: ${data.error}` 
        : `Error: ${data.message || 'Unknown error occurred.'}`;
      msg.className = 'fail';
    }
  } catch (err) {
    msg.textContent = `Error: ${err.message}`;
    msg.className = 'fail';
  }
});
