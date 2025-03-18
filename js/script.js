const owner = 'adrouser';  // Replace with your GitHub username
const repo = 'testFrontEnd';  // Replace with your repository name
const folder = 'projects';  // The folder where your project HTML files are stored


// Function to load the list of project titles dynamically from the GitHub API
async function loadProjectTitles() {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${folder}`;

    // Prepare headers for the API request
    const headers= '';

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Filter to only include HTML files
        const htmlFiles = data.filter(file => file.name.endsWith('.html'));

        // Get the navbar element to add the project titles
        const navbar = document.getElementById('navbar');
        navbar.innerHTML = '';  // Clear the navbar before adding new items

        // Loop through the files and add the project names as links
        htmlFiles.forEach(file => {
            const projectName = file.name.replace('.html', '');
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = projectName.charAt(0).toUpperCase() + projectName.slice(1);  // Capitalize the first letter of the name
            link.addEventListener('click', () => loadProjectContent(file.name)); // On click, load the content
            listItem.appendChild(link);
            navbar.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching project files:', error);
        const navbar = document.getElementById('navbar');
        navbar.innerHTML = '<li>Error loading projects</li>';
    }
}

// Function to load the content of a selected project
async function loadProjectContent(project) {
    const contentDiv = document.getElementById('content');
    try {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${folder}/${project}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        const data = await response.text();
        contentDiv.innerHTML = data;
    } catch (err) {
        contentDiv.innerHTML = "<p>Sorry, there was an error loading the project.</p>";
    }
}

// Initialize the page by loading project titles
loadProjectTitles();
