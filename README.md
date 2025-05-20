
# Reddit Clone

A fullstack Reddit-like platform built using Next.js, Prisma, PostgreSQL, and NextAuth with Reddit OAuth. Users can create communities, submit posts, and view them in real-time.

## 🚀 Live Links

- **Deployment**: [reddit-clone-git-main-sidharth-thakurs-projects-b58b9dfc.vercel.app/)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components, Turbopack)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (with Reddit OAuth provider)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🔑 Features

- ✅ User Authentication via Reddit
- ✅ Create and browse Communities (e.g., /r/AIML, /r/footballtalks)
- ✅ Submit Posts to communities
- ✅ View posts in descending order of creation
- ✅ Responsive UI
- ✅ Fully integrated database with Prisma Studio access
- ✅ Centralized post display with live updates

## 🧩 Folder Structure

```bash
reddit-clone/
├── app/                  # Next.js app router pages & API routes
├── components/           # Shared UI components like PostCard, CreatePostForm
├── lib/                  # Utility functions (auth, prisma)
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── .env.local            # Environment variables
└── ...


##🧪 Getting Started Locally
**1. Clone the Repo**
bash
Copy
Edit
git clone https://github.com/SidharthRThakur/reddit-clone.git
cd reddit-clone
**2. Install Dependencies**
bash
Copy
Edit
npm install
**3. Configure Environment**
Create a .env.local file and add:

env
Copy
Edit
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db>
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
**4. Setup Database**
bash
Copy
Edit
npx prisma db push
npx prisma studio # (optional - to view/edit data)
**5. Start the App**
bash
Copy
Edit
npm run dev
📂 GitHub Links
Repo: github.com/SidharthRThakur/reddit-clone

👤 Author
Sidharth R Thakur

📧 tsidharthsingh@gmail.com

