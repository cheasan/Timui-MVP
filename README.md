  
  # Timui MVP

  This is a code bundle for Timui MVP. The original project is available at https://www.figma.com/design/Kq2igetWB2XT5bUg3KZoxB/Timui-MVP.

  ## Running code

  Run `npm i` to install dependencies.

  Run `npm run dev` to start the development server.

  ## Telegram Mini App Setup

  ### 1. Configure Bot with @BotFather

  1. Open @BotFather on Telegram
  2. Use `/newapp` command
  3. Give your Mini App a name (e.g., "Timui MVP")
  4. When asked for the URL, paste your **deployed HTTPS URL** (after deploying to Vercel)
  5. BotFather will give you a Mini App URL (e.g., `https://t.me/your_bot/app`)

  ### 2. Set Menu Button (Optional)

  1. Use `/menubutton` command with @BotFather
  2. Select your bot
  3. Paste the Mini App URL
  4. Users can now access your app from the bot's menu button

  ### 3. Deploy to Vercel

  ```bash
  # Push to GitHub
  git add .
  git commit -m "Initial commit"
  git push origin main

  # Then connect your GitHub repo to Vercel.com
  # Vercel will auto-deploy on push
  ```

  ### Environment Variables

  The bot token is stored in `.env` file for reference:
  - `TELEGRAM_BOT_TOKEN`: Your bot token (used with @BotFather, not in client code)

  Note: The client-side Mini App doesn't need the bot token. It's only used for server-side validation or BotFather configuration.

