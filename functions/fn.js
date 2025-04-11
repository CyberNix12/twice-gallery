document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const folder = "galeries/"; // Folder utama galeri
    const memberFilter = document.getElementById("memberFilter");

    // Daftar anggota untuk kategori folder
    const members = [
        "Nayeon", "Jeongyeon", "Momo", "Sana", "Jihyo",
        "Mina", "Dahyun", "Chaeyoung", "Tzuyu"
    ];

    async function loadImages(member = "all") {
        gallery.innerHTML = ""; // Reset galeri setiap kali filter diubah

        // Jika 'all', ambil semua gambar dari setiap folder
        const folderPaths = member === "all" ? members : [member];

        try {
            for (const memberFolder of folderPaths) {
                const response = await fetch(folder + memberFolder + "/");
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, "text/html");
                const links = [...doc.querySelectorAll("a")]
                    .map(a => decodeURIComponent(a.href.split("/").pop()))
                    .filter(name => name.match(/\.(jpe?g|png|gif|webp|bmp|svg)$/i));

                links.forEach(image => {
                    const imgSrc = `${folder}${memberFolder}/${encodeURIComponent(image)}`;
                    const div = document.createElement("div");
                    div.className = "break-inside-avoid mb-4 shadow-lg rounded-lg overflow-hidden bg-white";

                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.className = "w-full rounded-lg cursor-pointer";
                    img.loading = "lazy";
                    img.alt = image;

                    // Klik gambar menuju detail.html dengan parameter URL
                    img.onclick = () => {
                        window.location.href = `detail.html?img=${encodeURIComponent(image)}&member=${encodeURIComponent(memberFolder)}`;
                    };

                    div.appendChild(img);
                    gallery.appendChild(div);
                });
            }
        } catch (error) {
            console.error("Error loading images:", error);
        }
    }

    // Memuat gambar sesuai filter yang dipilih
    memberFilter.addEventListener("change", function () {
        loadImages(memberFilter.value);
    });

    // Muat gambar pertama kali
    loadImages("all");
});
