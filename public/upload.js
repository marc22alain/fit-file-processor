document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const files = document.getElementById('fitFile').files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('fitFile', files[i]);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        let message = result.message + '\n\n';
        
        if (result.failedFiles && result.failedFiles.length > 0) {
            message += 'Failed files:\n';
            result.failedFiles.forEach(file => {
                message += `- ${file.filename}: ${file.reason}\n`;
            });
        }

        alert(message);
    } catch (error) {
        alert('Error uploading files: ' + error.message);
    }
});
