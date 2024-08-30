// upload.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fileInput = document.getElementById('file');
            const file = fileInput.files[0];

            if (file) {
                try {
                    const storageRef = window.firebase.storage.ref('uploads/' + file.name);
                    const uploadTask = await storageRef.put(file);

                    const downloadURL = await uploadTask.ref.getDownloadURL();
                    alert('File uploaded successfully. URL: ' + downloadURL);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('Error uploading file.');
                }
            } else {
                alert('Please select a file.');
            }
        });
    } else {
        console.error('Form not found.');
    }
});
