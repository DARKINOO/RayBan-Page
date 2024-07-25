
function showAchievements(year) {
    const contentDiv = document.getElementById('achievements-content');
    const achievement = achievements[year];
    
    contentDiv.innerHTML = `
        <div class="card">
            <img src="${achievement.image}" alt="Achievement ${year}">
            <p>${achievement.text}</p>
        </div>
    `;
    contentDiv.style.display = 'block';
}

