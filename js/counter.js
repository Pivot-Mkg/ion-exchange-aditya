document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.track-stats');
    const animationDuration = 2000; // 2 seconds for all counters to complete
    let animationStarted = false;

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                animationStarted = true;
                
                // Start all counters with the same duration
                const startTime = Date.now();
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const startValue = 0;
                    
                    const updateCounter = () => {
                        const currentTime = Date.now();
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / animationDuration, 1);
                        
                        // Use ease-out function for smoother deceleration
                        const easeOutProgress = 1 - Math.pow(1 - progress, 2);
                        const currentValue = Math.floor(easeOutProgress * (target - startValue) + startValue);
                        
                        counter.textContent = currentValue;
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                });
                
                // Stop observing after starting the animation
                observer.unobserve(entry.target);
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(startCounters, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Start observing the stats section
    if (statsSection) {
        observer.observe(statsSection);
    }
});
