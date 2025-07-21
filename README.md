
# 📜 HadithBot – AI-powered Telegram Bot for Hadith Suggestions

HadithBot is a Telegram bot that receives a topic from the user and returns a related Islamic hadith (narration), using OpenAI's language model. It stores user queries and responses using a PostgreSQL database powered by Prisma ORM.

---

## 🚀 Features

- ✅ `/start` command: Welcomes the user
- ✅ `/history` command: Shows the user's last 5 messages and responses
- ✅ `/clear` command: Deletes the user's message history
- ✅ Text message support: Sends a hadith based on the user's topic
- ✅ Automatic user creation (via `upsert`) if it's their first message

---

## 🧰 Tech Stack

- **Node.js**
- **TypeScript**
- **Telegraf.js** – Telegram Bot Framework
- **OpenAI API** – for natural language understanding & response generation
- **Prisma** – Type-safe database ORM
- **sqlite** – Database for users and message history
- **dotenv** – To load environment variables

---

## 📁 Project Structure

```

📦 hadith-bot
┣ 📂src
┃ ┣ 📂services
┃ ┃ ┣ 📄 openaiService.ts     # Handles OpenAI API requests
┃ ┃ ┣ 📄 prismaService.ts     # Exports initialized Prisma client
┃ ┣ 📄 index.ts               # Main entry point for the bot
┣ 📄 .env                     # Stores BOT\_TOKEN and API keys
┣ 📄 package.json
┣ 📄 tsconfig.json

````

---

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/hadith-bot.git
cd hadith-bot
````

2. **Install dependencies:**

```bash
npm install
```

3. **Create your `.env` file:**

```env
BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
```

4. **Set up the database (PostgreSQL) with Prisma:**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Start the bot:**

```bash
npm start 
```

---

## 💡 Example Usage

| Command      | Description                                    |
| ------------ | ---------------------------------------------- |
| `/start`     | Greets the user                                |
| `/history`   | Shows the user's 5 latest topics and responses |
| `/clear`     | Deletes the user's entire message history      |
| Text Message | Returns a hadith related to the sent topic     |

---

## ⚠️ Notes

* Messages that start with `/` are treated as commands and ignored by the text message handler.
* Messages and user data are persisted in the database via Prisma.
* For better maintainability, it's recommended to **modularize the bot** in the future (e.g., move each command handler to its own file).

---

## 📜 License

MIT – Feel free to use, modify, and share!

---

## 🤝 Contributions

Feel free to open issues or PRs. Help is welcome in improving the structure, adding more hadith sources, or enhancing AI prompts!
