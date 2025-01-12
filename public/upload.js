document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const files = document.getElementById('fitFile').files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('fitFile', files[i]);
    }

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Files uploaded successfully');
    } else {
        alert('Failed to upload files');
    }
});