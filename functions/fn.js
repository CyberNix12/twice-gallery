document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    const folder = "./galeries/"; // Folder utama galeri
    const memberFilter = document.getElementById("memberFilter");

    // Daftar anggota untuk kategori folder
    const members = [
        "Nayeon", "Jeongyeon", "Momo", "Sana", "Jihyo",
        "Mina", "Dahyun", "Chaeyoung", "Tzuyu"
    ];

    // Fungsi untuk memuat gambar dari folder dengan pola nama tertentu
    async function loadImages(member = "all") {
        gallery.innerHTML = ""; // Reset galeri setiap kali filter diubah

        // Jika 'all', ambil semua gambar dari setiap folder
        const folderPaths = member === "all" ? members : [member];

        try {
            for (const memberFolder of folderPaths) {
                // Asumsikan jumlah gambar maksimum di setiap folder (misalnya, 50)
                const maxImages = 50;

                for (let i = 1; i <= maxImages; i++) {
                    const imgSrc = `${folder}${memberFolder}/image${i}.jpg`;

                    // Coba memuat gambar, dan tambahkan ke galeri jika tersedia
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.className = "w-full rounded-lg cursor-pointer";
                    img.loading = "lazy";
                    img.alt = `image${i}`;

                    // Klik gambar menuju detail.html dengan parameter URL
                    img.onclick = () => {
                        window.location.href = `detail.html?img=${encodeURIComponent(`image${i}.jpg`)}&member=${encodeURIComponent(memberFolder)}`;
                    };

                    // Buat elemen div untuk membungkus gambar
                    const div = document.createElement("div");
                    div.className = "break-inside-avoid mb-4 shadow-lg rounded-lg overflow-hidden bg-white";
                    div.appendChild(img);

                    // Tambahkan ke galeri
                    gallery.appendChild(div);

                    // Handle error jika gambar tidak ada
                    img.onerror = () => {
                        div.remove(); // Hapus elemen jika gambar gagal dimuat
                    };
                }
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
