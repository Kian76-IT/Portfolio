export const projects = [
    {
        title: "Diabetes RAG Chatbot",
        roles: [
            "Build AI",
            "Train LLM & Fine Tuned",
            "Evaluation & Visualization",
        ],
        description: "Developed a Retrieval-Augmented Generation (RAG) based diabetes health chatbot using Transformer-based embedding models and a Large Language Model. The project involved comparing BERT, DistilBERT, RoBERTa, and ALBERT to evaluate their performance in retrieving relevant information from a diabetes-focused knowledge base. I implemented the LLM component using TinyLlama with LoRA fine-tuning and evaluated the system through retrieval and generation metrics, including Precision@3, Recall@3, MRR, Hit Rate, BLEU, ROUGE, and BERTScore. The evaluation showed that ALBERT achieved the strongest retrieval performance, while the generator achieved a BERTScore-F1 of 0.8625, demonstrating high semantic similarity to the reference answers.",

        tech:["Pyhon", "FAISS", "LoRA","ALBERT", "Ollama"],
        image: "/images/projects/rag.jpg",
        repo: "https://github.com/Kian76-IT/RAG_Medical_chatBot.git",
        demo: "https://huggingface.co/spaces/Lower78/chat-bot-rag-diabetes"

    },

    {
        title: "Save n Serve",
        roles: [
            "Database",
            "Splash Screen & Login",
            "Backend"
        ],
        description: "Save n Serve is a food donation platform designed to reduce food waste while helping people access meals more easily. Restaurants and food providers can share surplus food before closing, either by selling it at an affordable price or donating it to those in need. Users can also donate through the app, creating a simple way to turn surplus food into meaningful support for the community.",

        tech:["Express.js", "Dart   ", "Supabase"],
        image: "/images/projects/save_n_serve.jpg",
        repo: "https://github.com/Kian76-IT/Save_n_Serve.git",
        demo: ""

    },
    {
        title: "Air Blocks",
        roles: [
            "Evaluaztion & Visualization",
            "Optimizing Model"
        ],
        description: "Developed AirBlocks, an interactive block-based puzzle game that uses real-time computer vision and hand gesture recognition as its primary control mechanism. The system captures live webcam input using OpenCV and uses MediaPipe Hand Tracking to detect 21 hand landmarks and interpret spatial relationships between fingers and the palm. Predefined gesture rules are then mapped to in-game actions, such as spawning, dropping, and moving blocks, while Pygame handles the game environment and real-time rendering. The project focuses on creating a more intuitive and responsive gaming experience through vision-based human-computer interaction",

        tech:["Open CV, Media Pipe"],
        image: "/images/projects/air_blocks.png",
        repo: "https://github.com/jstn77/Air-Blocks-Hand-Gesture-Tracking-Block-Puzzle-Games.git",
        demo: "https://huggingface.co/spaces/britod/airblocks-handgesture-games"

    },
    {
        title: "Lung Cancer Detection",
        roles: [
            "Dataset Collecting",
            "Build AI",
            "Evaluation & Visualization"
        ],
        description: "Developed a two-stage deep learning system for lung cancer detection from CT-scan images, combining image classification and lesion localization. The first stage uses a fine-tuned ResNet-50 model with transfer learning to classify CT images as cancerous or non-cancerous, while the second stage applies YOLOv8n to localize suspected lung lesions using bounding boxes. The image preprocessing pipeline includes CLAHE contrast enhancement, Gaussian filtering, image resizing, and data augmentation to improve input quality and model robustness. The system achieved 98.18% classification accuracy with ResNet-50, while YOLOv8n achieved a precision of 0.7042 and mAP@0.5 of 0.6572 for lesion localization.",
        tech:["YOLO v8, YOLO v9, Python, Roboflow"],
        image: "/images/projects/lung-cancer.png",
        repo: "https://github.com/Kian76-IT/Deteksi_Lungs_Cancer.git",
        demo: "https://detection-lungs-cancer.streamlit.app/"

    },
    {
        title: "Sistem Rekomendasi Destinasi Wisata di Indonesia Menggunakan Metode Content-Based Filtering",
        roles: [
            "Build Machine Learning",
            "Evaluation & Visualization"
        ],
        description: "Developed a content-based recommendation system to provide personalized tourist destination suggestions based on user preferences. The system processes destination features such as description, category, city, price, and rating using TF-IDF, then applies cosine similarity to identify and recommend destinations with similar characteristics. The project uses an Indonesia tourism dataset containing 437 destinations across five major cities and includes a popularity-based recommendation approach as a baseline for comparison. The system is designed with a web-based interface that allows users to select tourism categories or provide a favorite destination and receive relevant recommendations along with information such as rating, price, category, and location.",
        tech:["Content-Based Filtering, Python,"],
        image: "/images/projects/ML.png",
        repo: "https://github.com/jstn77/Recommender_System_Destination_Indonesia.git",
        demo: "http://recommendersystemdestinationindonesia.streamlit.app/"

    },

]
