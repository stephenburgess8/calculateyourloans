function dismissMenu(e) {
    const navList = document.getElementsByClassName("nav-ul")[0];
    const isClickOnNavList = e.target.className === 'nav-ul';
    if(navList.className !== "nav-ul" && !isClickOnNavList)
    {
        openCloseMenu(e);
    }
}

function openCloseMenu(e)
{
    e.stopPropagation();
    const navList = document.getElementsByClassName("nav-ul")[0];
    navList.classList.toggle("open");
}

/**
 * @return void
**/
function clear() {
    location.reload();
}

/**
 * @return void
**/
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementById("main").addEventListener('click', function(event){ dismissMenu(event); }, false);
	}
};
