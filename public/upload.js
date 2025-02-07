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

        // Create and show a modal with the message
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background-color: #fefefe;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 600px;
            max-height: 80%;
            overflow-y: auto;
        `;

        modalContent.innerHTML = `
            <h2>Upload Results</h2>
            <pre>${message}</pre>
            <button id="closeModal" style="float: right;">Close</button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        document.getElementById('closeModal').onclick = function() {
            document.body.removeChild(modal);
        };
    } catch (error) {
        alert('Error uploading files: ' + error.message);
    }
});
