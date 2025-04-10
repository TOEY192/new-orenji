window.onload = async () => {
    const a = await fetch('/check-role');
    if(!a.ok) window.location.href = "/";
}