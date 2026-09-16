document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ADMIN LOGIN
    ========================= */

    const loginForm = document.getElementById("adminLoginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const passwordInput = document.getElementById("adminPassword");
            const loginMessage = document.getElementById("loginMessage");

            if (passwordInput.value === "omkar07") {

                loginMessage.textContent = "Login successful.";

                setTimeout(function () {
                    window.location.href = "dashboard.html";
                }, 500);

            } else {

                loginMessage.textContent = "Incorrect password.";
                passwordInput.value = "";

            }

        });

    }


    /* =========================
       LOGOUT
    ========================= */

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {
            window.location.href = "admin.html";
        });

    }


    /* =========================
       TEMPORARY MUSIC MANAGEMENT
    ========================= */

    const songForm = document.getElementById("songForm");

    if (songForm) {

        const songList = document.getElementById("songList");
        const songCount = document.getElementById("songCount");

        let songs =
            JSON.parse(localStorage.getItem("villianstudioSongs")) || [];


        function displaySongs() {

            songList.innerHTML = "";

            if (songs.length === 0) {

                songList.innerHTML = `
                    <div class="empty-message">
                        No songs added yet.
                    </div>
                `;

                songCount.textContent = "0 Songs";

                return;
            }


            songCount.textContent =
                songs.length +
                (songs.length === 1 ? " Song" : " Songs");


            songs.forEach(function (song, index) {

                const songItem = document.createElement("div");

                songItem.className = "song-card";


                songItem.innerHTML = `
                    <div class="song-image">

                        ${
                            song.image
                            ? `<img src="${song.image}" alt="${song.name}">`
                            : `<div class="image-placeholder">
                                    SONG IMAGE
                               </div>`
                        }

                    </div>


                    <div class="song-info">

                        <h3>${song.name}</h3>

                        <p>
                            <strong>Category:</strong>
                            ${song.category}
                        </p>

                        <p>
                            ${song.description}
                        </p>


                        <div class="song-actions">

                            ${
                                song.youtube
                                ? `<a
                                    href="${song.youtube}"
                                    target="_blank"
                                    class="primary-btn">
                                    YouTube
                                   </a>`
                                : ""
                            }


                            ${
                                song.audio
                                ? `<audio
                                    controls
                                    src="${song.audio}">
                                   </audio>`
                                : ""
                            }


                            <button
                                class="secondary-btn delete-song"
                                data-index="${index}">
                                Delete
                            </button>

                        </div>

                    </div>
                `;


                songList.appendChild(songItem);

            });


            document
                .querySelectorAll(".delete-song")
                .forEach(function (button) {

                    button.addEventListener("click", function () {

                        const index =
                            Number(this.dataset.index);

                        songs.splice(index, 1);


                        localStorage.setItem(
                            "villianstudioSongs",
                            JSON.stringify(songs)
                        );


                        displaySongs();

                    });

                });

        }


        songForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                document.getElementById("songName").value;

            const category =
                document.getElementById("songCategory").value;

            const description =
                document.getElementById("songDescription").value;

            const youtube =
                document.getElementById("youtubeLink").value;


            const imageFile =
                document.getElementById("songImage").files[0];

            const audioFile =
                document.getElementById("songAudio").files[0];


            const saveSong =
                function (imageData, audioData) {

                    const newSong = {

                        name: name,

                        category: category,

                        description: description,

                        youtube: youtube,

                        image: imageData || "",

                        audio: audioData || ""

                    };


                    songs.push(newSong);


                    localStorage.setItem(
                        "villianstudioSongs",
                        JSON.stringify(songs)
                    );


                    songForm.reset();

                    displaySongs();

                };


            let imageData = "";

            let audioData = "";


            if (imageFile) {

                const imageReader =
                    new FileReader();


                imageReader.onload =
                    function (event) {

                        imageData =
                            event.target.result;


                        if (audioFile) {

                            const audioReader =
                                new FileReader();


                            audioReader.onload =
                                function (event) {

                                    audioData =
                                        event.target.result;


                                    saveSong(
                                        imageData,
                                        audioData
                                    );

                                };


                            audioReader.readAsDataURL(
                                audioFile
                            );

                        } else {

                            saveSong(
                                imageData,
                                ""
                            );

                        }

                    };


                imageReader.readAsDataURL(
                    imageFile
                );


            } else if (audioFile) {

                const audioReader =
                    new FileReader();


                audioReader.onload =
                    function (event) {

                        audioData =
                            event.target.result;


                        saveSong(
                            "",
                            audioData
                        );

                    };


                audioReader.readAsDataURL(
                    audioFile
                );


            } else {

                saveSong(
                    "",
                    ""
                );

            }

        });


        displaySongs();

    }


    /* =========================
       SHOW MUSIC ON PUBLIC PAGE
    ========================= */

    const publicSongList =
        document.getElementById("publicSongList");


    if (publicSongList) {

        const songs =
            JSON.parse(
                localStorage.getItem("villianstudioSongs")
            ) || [];


        if (songs.length === 0) {

            publicSongList.innerHTML = `
                <div class="empty-message">
                    No music available yet.
                </div>
            `;

        } else {

            publicSongList.innerHTML = "";


            songs.forEach(function (song) {

                const card =
                    document.createElement("article");


                card.className =
                    "song-card";


                card.innerHTML = `

                    <div class="song-image">

                        ${
                            song.image
                            ? `<img
                                src="${song.image}"
                                alt="${song.name}">
                               `
                            : `<div class="image-placeholder">
                                SONG IMAGE
                               </div>`
                        }

                    </div>


                    <div class="song-info">

                        <h3>
                            ${song.name}
                        </h3>


                        <p>
                            ${song.description}
                        </p>


                        <div class="song-actions">

                            ${
                                song.youtube
                                ? `<a
                                    href="${song.youtube}"
                                    target="_blank"
                                    class="primary-btn">
                                    YouTube
                                   </a>`
                                : ""
                            }


                            ${
                                song.audio
                                ? `<audio
                                    controls
                                    src="${song.audio}">
                                   </audio>`
                                : ""
                            }

                        </div>

                    </div>
                `;


                publicSongList.appendChild(card);

            });

        }

    }

});