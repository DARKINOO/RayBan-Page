function expandCard(card) {
    // Collapse any expanded card
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard && expandedCard !== card) {
        expandedCard.classList.remove('expanded');
    }

    // Toggle expansion of the clicked card
    card.classList.toggle('expanded');
}

// Close the card when clicking outside of it
document.addEventListener('click', function(event) {
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard && !expandedCard.contains(event.target)) {
        expandedCard.classList.remove('expanded');
    }
});
