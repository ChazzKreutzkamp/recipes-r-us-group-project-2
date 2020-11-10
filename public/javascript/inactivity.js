//provisionally added in case we want to have an inactivity logout feature.
function idleLogout() {
    var time;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;
    window.addEventListener('scroll', resetTimer, true);

    async function logout() {
        const response = await fetch('/api/users/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
            alert("You have been logged out due to inactivity");
        } else {
            alert(response.statusText);
        }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 1200000); //resets after 20 minutes
    }
}

idleLogout();

//citation for the code above:
//CherianCherian, et al. (2009). How to detect idle time in JavaScript elegantly? Retrieved November 02, 2020, from https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript-elegantly
//I utilized the forum post above to find a method to create a timer that resets based on inactivity and then edited it in accordance to my needs.