document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    fetchGitHubProjects();
});

async function fetchGitHubProjects() {
    const grid = document.getElementById('projects-grid');
    const username = 'likithgowda314-cyber';
    
    // Explicitly target the tools we built
    const featuredRepos = ['clutter-clear', 'port-reaper', 'stack-sleuth', 'context-weaver'];

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const allRepos = await response.json();
        
        // Filter out the featured repos
        const projects = allRepos.filter(repo => featuredRepos.includes(repo.name));
        
        if (projects.length === 0) {
            grid.innerHTML = '<div class="loading-state">No projects found.</div>';
            return;
        }

        grid.innerHTML = ''; // Clear loading state

        projects.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'card';
            
            // Format Topics
            let topicsHtml = '';
            if (repo.topics && repo.topics.length > 0) {
                const limitedTopics = repo.topics.slice(0, 3);
                topicsHtml = `<div class="topics">${limitedTopics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>`;
            }

            card.innerHTML = `
                <a href="${repo.html_url}" target="_blank" class="card-link" aria-label="View ${repo.name} on GitHub">
                    <h4 class="card-title">📁 ${repo.name}</h4>
                </a>
                <p class="card-desc">${repo.description || 'A brilliant developer tool.'}</p>
                ${topicsHtml}
                <div class="card-meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>${repo.language || 'Code'}</span>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        grid.innerHTML = '<div class="loading-state" style="color: #ef4444;">Unable to load projects right now. Please visit my GitHub.</div>';
        console.error('Error fetching repos:', error);
    }
}
