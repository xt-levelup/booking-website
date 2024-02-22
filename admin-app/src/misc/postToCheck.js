const postToCheck = async (pathToServer) => {
    const response = await fetch(`http://localhost:5000/${pathToServer}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            User: localStorage.getItem("userData"),
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data ? data.message : "Something went wrong!");
    } else {
        console.log("Post check succeeded!");
    }
};

export default postToCheck;
