// Structured Help Center data for ChatWidget.astro
// Each article body is an array of blocks: {t:'p'} paragraph, {t:'h'} subheading, {t:'ul', items:[]} list

export const helpCollections = [
{
  id: 'general',
  title: 'General Questions',
  articles: [
    {
      title: 'What is your service?',
      subtitle: 'What do we do?',
      body: [
        {t:'h', v:'Welcome to ThesisArcPro'},
        {t:'p', v:"ThesisArcPro is an academic support platform that connects students with vetted, subject-matter consultants for essay writing, research papers, coursework, case studies, dissertations, and more — across 30+ disciplines and academic levels, from high school through PhD."},
        {t:'h', v:'How It Works'},
        {t:'p', v:'Getting help with your academic work is simple:'},
        {t:'ul', items:[
          'Create an account — sign up in a few seconds, it\u2019s free.',
          'Place your order — tell us your topic, requirements, and deadline.',
          'Choose your consultant — browse profiles, read reviews, and chat with experts before deciding who to work with.',
          'Make a deposit — your payment is held securely in your account balance until the work is delivered.'
        ]},
        {t:'h', v:'Reviewing Your Completed Work'},
        {t:'p', v:"Once your consultant finishes, they'll upload the draft directly to your order page. You can review it against your original instructions and request revisions at no extra cost, either through the order chat or by contacting our support team."},
        {t:'h', v:'Releasing Payment'},
        {t:'p', v:"Your funds stay safely in your account until you're satisfied with the final result. If no issues are raised, payment is released to your consultant automatically after a short review window — but you're always free to approve and release it sooner once you're happy with the work."},
        {t:'h', v:'Still Have Questions?'},
        {t:'p', v:"Our support team is available 24/7 through the chat widget. Reach out anytime — we're happy to help."}
      ]
    },
    {
      title: 'Do you have a high-grade guarantee?',
      subtitle: 'Can I count on good results?',
      body: [
        {t:'h', v:'Quality You Can Rely On'},
        {t:'p', v:"While we can't promise a specific letter grade — no service honestly can, since grading standards vary by school and instructor — we do guarantee that every piece of work is original, well-researched, and built to your exact instructions."},
        {t:'h', v:'How We Protect Quality'},
        {t:'ul', items:[
          'Consultants are matched to your subject based on their academic background and experience.',
          "Every project passes through an editor's quality check before delivery.",
          "You get unlimited revisions if the work doesn't match your original requirements.",
          "A money-back guarantee applies if we're unable to deliver as agreed."
        ]},
        {t:'h', v:'Bottom Line'},
        {t:'p', v:'Our job is to give you a strong, properly researched, plagiarism-free foundation. The stronger your instructions and source materials, the stronger the result.'}
      ]
    },
    {
      title: 'Is this service free?',
      subtitle: 'What does it actually cost?',
      body: [
        {t:'h', v:'Core Service'},
        {t:'p', v:'Creating an account, browsing consultant profiles, and getting a quote are all free. You only pay once you place an order and hire a consultant.'},
        {t:'h', v:"What's Included at No Extra Cost"},
        {t:'ul', items:['Topic suggestions','Formatting to your required style','Title page and reference list','Editor quality check','Unlimited revisions']},
        {t:'h', v:'Optional Add-Ons'},
        {t:'p', v:'Some extras — like an abstract page, printable sources, or extra graphics/tables — carry a small additional fee, which is always shown clearly before you confirm your order.'},
        {t:'h', v:'Pricing'},
        {t:'p', v:"Rates start at $5 per page and depend on academic level, deadline, and page count. You'll see the full price breakdown before you pay anything."}
      ]
    },
    {
      title: 'May I check samples of your work?',
      subtitle: 'Can I see examples before ordering?',
      body: [
        {t:'h', v:'Yes, Absolutely'},
        {t:'p', v:"You're welcome to review consultant profiles, ratings, and past client feedback before choosing who to work with — this gives you a good sense of their writing style and expertise."},
        {t:'h', v:"Why We Don't Publish Full Sample Papers"},
        {t:'p', v:"We don't post fully completed papers publicly, since every project is custom-written for a specific student, and submitting shared content anywhere could raise plagiarism concerns for you. Instead, you can chat directly with a prospective consultant, ask about their experience with similar topics, and request a short writing sample tailored to your subject before you commit."}
      ]
    },
    {
      title: 'Why do I have to pay up front?',
      subtitle: 'Is my money safe?',
      body: [
        {t:'h', v:'Your Payment Is Protected, Not Spent'},
        {t:'p', v:"When you pay upfront, your funds aren't released to the consultant immediately — they're held securely in your account balance. This protects both sides: your consultant knows the project is funded before they start, and you keep full control until you approve the finished work."},
        {t:'h', v:'When Payment Is Released'},
        {t:'p', v:"Funds are only released to your consultant after you confirm you're satisfied, or automatically after a short review window if no issues are raised. If something's wrong, you can request revisions or contact support before releasing anything."}
      ]
    },
    {
      title: 'What formatting styles do you offer?',
      subtitle: 'Which citation formats can you follow?',
      body: [
        {t:'h', v:'Formatting Included, Free'},
        {t:'p', v:'Our consultants are experienced in all major academic formatting and citation styles, including:'},
        {t:'ul', items:['APA','MLA','Harvard','Chicago/Turabian','OSCOLA (for law)','IEEE']},
        {t:'p', v:"Just specify your required style (and edition, if applicable) when placing your order, and it'll be applied at no extra cost — formatting is one of our free included services."}
      ]
    },
    {
      title: "What's the minimum completion time?",
      subtitle: 'How fast can you deliver?',
      body: [
        {t:'h', v:'Deadlines From 3 Hours'},
        {t:'p', v:'We can accommodate urgent requests, with delivery windows starting from as little as 3 hours for shorter assignments. Turnaround time depends on the complexity, length, and subject of your project.'},
        {t:'h', v:'Tips for Tight Deadlines'},
        {t:'ul', items:[
          'Provide clear, complete instructions upfront — this speeds up matching and drafting.',
          "Choose a consultant who's already active and available.",
          'Reach out to support if you need help finding someone who can meet an especially tight window.'
        ]},
        {t:'p', v:"We understand deadlines aren't flexible, so we prioritize keeping your consultant on track throughout the process."}
      ]
    },
    {
      title: 'I need an urgent revision. Can you help me?',
      subtitle: 'What if I need changes fast?',
      body: [
        {t:'h', v:'Yes — Revisions Are Free and Fast'},
        {t:'p', v:'If your delivered work needs adjustments, you can request a revision directly through the order chat with your consultant, or contact our 24/7 support team for help.'},
        {t:'h', v:'How to Get a Quick Turnaround'},
        {t:'ul', items:[
          'Be specific about what needs to change and why.',
          "Reference the exact section or requirement that wasn't met.",
          "Mention your new deadline clearly, if it's urgent."
        ]},
        {t:'p', v:'Revisions are included in your original order at no extra charge, as long as the request aligns with your initial instructions.'}
      ]
    },
    {
      title: 'Can I pay after I see my completed order?',
      subtitle: 'Do I have to pay before I see the work?',
      body: [
        {t:'h', v:'How Our Payment Protection Works'},
        {t:'p', v:"You do need to fund your order upfront, but that money isn't handed to your consultant right away — it's held safely in your account until you're satisfied with the delivered work. You review the final draft first, and only then does payment get released."},
        {t:'h', v:"If You're Not Happy"},
        {t:'p', v:"You're not obligated to release payment on a draft that doesn't meet your instructions. You can request revisions, discuss changes with your consultant, or contact support for help resolving any issues before funds are released."}
      ]
    },
    {
      title: 'Are the title and reference pages free?',
      subtitle: 'Do formatting extras cost anything?',
      body: [
        {t:'h', v:'Yes, Included at No Extra Charge'},
        {t:'p', v:"Title pages and reference/bibliography pages are part of our free included services on every order, formatted to your specified citation style. You won't be charged separately for these."},
        {t:'h', v:'What Does Cost Extra'},
        {t:'p', v:'A few optional add-ons — like an abstract page, printable copies of your sources, or additional graphics and tables — carry a small extra fee, always shown upfront before checkout.'}
      ]
    },
    {
      title: 'Can you help with all types of assignments?',
      subtitle: 'What kinds of academic work do you cover?',
      body: [
        {t:'h', v:'Wide Range of Support'},
        {t:'p', v:'We assist with most academic assignment types, including:'},
        {t:'ul', items:[
          'Essays and research papers','Coursework and case studies','Dissertations and theses','Personal statements','Capstone projects','Lab reports','Annotated bibliographies','PowerPoint presentations',
          'Homework across subjects like math, biology, chemistry, finance, and more'
        ]},
        {t:'h', v:"Not Sure If We Cover Yours?"},
        {t:'p', v:"Reach out to our support team with details about your assignment before ordering, and we'll confirm whether we have a consultant with the right expertise for your specific task."}
      ]
    },
    {
      title: 'How can I be sure that this is not a scam?',
      subtitle: 'Is ThesisArcPro trustworthy?',
      body: [
        {t:'h', v:'Built-In Protections'},
        {t:'p', v:"We understand this concern, so we've structured the entire process to protect you:"},
        {t:'ul', items:[
          'Payments are held in your account, not released until you approve the work.',
          'You choose and vet your own consultant before committing.',
          'Every consultant is verified before joining the platform.',
          "We offer a money-back guarantee if we don't deliver as agreed.",
          'Thousands of students have used the service, with reviews visible on consultant profiles.'
        ]},
        {t:'h', v:'Still Have Doubts?'},
        {t:'p', v:"You're always welcome to chat with our support team before placing an order — we're happy to answer questions and walk you through how everything works."}
      ]
    },
    {
      title: 'Is your service confidential?',
      subtitle: 'Will my information be shared with anyone?',
      body: [
        {t:'h', v:'Your Privacy Comes First'},
        {t:'p', v:'Yes. All your personal details, order information, and communications with your consultant are kept strictly private. We do not share your data with your school, other students, or any third party.'},
        {t:'h', v:'What This Means for You'},
        {t:'ul', items:[
          'Your research and materials remain your intellectual property.',
          'Confidentiality standards bind consultants.',
          'Payment information is processed securely and never shared.'
        ]},
        {t:'p', v:'You can use our service with full confidence that your academic work stays between you and your consultant.'}
      ]
    },
    {
      title: 'In which countries do you operate?',
      subtitle: 'Is your service available where I live?',
      body: [
        {t:'h', v:'Available Worldwide'},
        {t:'p', v:'ThesisArcPro is an online platform, so students anywhere in the world can sign up, place an order, and get matched with a consultant — no location restrictions.'},
        {t:'h', v:'Language Support'},
        {t:'p', v:"We support academic work in multiple languages and formatting standards used internationally, so whether you're studying under a US, UK, or other university system, we can match you with a consultant familiar with your specific requirements."}
      ]
    }
  ]
},
{
  id: 'placing-order',
  title: 'Placing An Order',
  articles: [
    {
      title: "Can an expert complete an unfinished assignment I've already started?",
      subtitle: 'Can a consultant pick up where I left off?',
      body: [
        {t:'h', v:'Yes, We Can Help'},
        {t:'p', v:"If you've already started your assignment and just need someone to finish it, one of our consultants can take it from where you stopped."},
        {t:'h', v:"If Your Existing Work Doesn't Need Changes"},
        {t:'p', v:'Place a new order for only the remaining portion. When filling out the order form, select Writing as the assignment type and clearly explain what\u2019s already been done and what still needs to be completed.'},
        {t:'h', v:'If Your Existing Work Needs Editing Too'},
        {t:'p', v:'You have two options:'},
        {t:'ul', items:[
          'Discuss it with your consultant within a Writing order, so they can revise your existing sections alongside completing the rest.',
          "Place a separate order under Editing if you'd only like your existing part reviewed and polished, with the remaining part handled separately."
        ]},
        {t:'p', v:"Either way, just give your consultant clear instructions on what's finished, what's missing, and any specific requirements for the parts that still need work."}
      ]
    },
    {
      title: 'Why do I receive proposals higher than the minimum price?',
      subtitle: "Why aren't all offers at the lowest rate?",
      body: [
        {t:'h', v:'Pricing Reflects the Consultant, Not Just the Task'},
        {t:'p', v:'The price shown when you place an order is a starting estimate based on page count, academic level, and deadline. Once your order is posted, individual consultants can send proposals with their own rates, which may be higher depending on:'},
        {t:'ul', items:[
          'Their experience level and track record in your subject area',
          'How complex or specialized your topic is',
          'How tight your deadline is',
          'Current demand for consultants in that field'
        ]},
        {t:'h', v:"You're Always in Control"},
        {t:'p', v:"You're never required to accept the first or highest proposal. You can compare consultant profiles, reviews, and rates, chat with a few before deciding, and choose whoever fits your budget and requirements best."}
      ]
    },
    {
      title: 'What to do if an expert cancels the order?',
      subtitle: 'My consultant backed out — now what?',
      body: [
        {t:'h', v:"Don't Worry — Your Payment Is Protected"},
        {t:'p', v:"If a consultant cancels after you've hired them, your funds remain safely in your account balance. Nothing is lost."},
        {t:'h', v:'Next Steps'},
        {t:'ul', items:[
          'Check your order chat for any explanation from the consultant.',
          'Return to your order page and select a new consultant from the available proposals, or repost the order if needed.',
          "If you're not sure how to proceed, contact our 24/7 support team — we can help you find a replacement consultant quickly, especially if your deadline is close."
        ]},
        {t:'p', v:'We aim to make sure a cancellation never puts your deadline at risk.'}
      ]
    },
    {
      title: 'How can I hire an expert?',
      subtitle: "What's the process for choosing a consultant?",
      body: [
        {t:'h', v:'Step by Step'},
        {t:'ul', items:[
          'Place your order with your assignment details, subject, and deadline.',
          'Review proposals from consultants interested in your project, including their rates, ratings, and experience.',
          'Chat with candidates to ask questions about their background or approach before deciding.',
          'Select and confirm the consultant you\u2019d like to work with, then fund your order to get started.'
        ]},
        {t:'h', v:'Tips for Choosing the Right Fit'},
        {t:'ul', items:[
          'Look for experience in your specific subject or discipline.',
          'Check ratings and feedback from previous students.',
          'Ask about their availability relative to your deadline.'
        ]},
        {t:'p', v:"Once you've hired a consultant, you can track progress and communicate directly through the order chat."}
      ]
    },
    {
      title: "What's the Difference Between an Open and Private Order?",
      subtitle: 'Should I make my order visible to everyone or just one consultant?',
      body: [
        {t:'h', v:'Open Order'},
        {t:'p', v:"Your order is visible to all eligible consultants, who can send you proposals to work on your project. This gives you a wider pool of candidates to compare and choose from — ideal if you're not sure who you want yet, or want the best possible match."},
        {t:'h', v:'Private Order'},
        {t:'p', v:"You send the order directly to a specific consultant you've already chosen — for example, someone you've worked with before or found through their profile. Only that consultant can see and respond to it."},
        {t:'h', v:'Which Should You Choose?'},
        {t:'ul', items:['New to the platform or want more options \u2192 Open Order','Already have a consultant in mind \u2192 Private Order']},
        {t:'p', v:'Both options offer the same payment protection and support.'}
      ]
    },
    {
      title: 'I have not received any proposals for my order. What should I do?',
      subtitle: "No one has responded to my order yet — what's next?",
      body: [
        {t:'h', v:'Common Reasons'},
        {t:'ul', items:[
          'Your deadline is unusually tight, limiting who can take it on.',
          'Your subject is highly specialized, narrowing the pool of qualified consultants.',
          'Your instructions may be unclear or incomplete, making consultants hesitant to bid.'
        ]},
        {t:'h', v:'What You Can Do'},
        {t:'ul', items:[
          'Double-check your order details are clear, complete, and specific.',
          'Consider adjusting your deadline or budget slightly.',
          'Browse consultant profiles directly and send a private order to someone whose expertise matches your topic.',
          "Contact our support team — we can help match you with an available consultant directly."
        ]},
        {t:'p', v:"We're happy to step in and help if your order isn't getting traction."}
      ]
    },
    {
      title: 'How to place an order?',
      subtitle: 'What are the steps to get started?',
      body: [
        {t:'h', v:'Getting Started'},
        {t:'ul', items:[
          'Create a free account or log in if you already have one.',
          'Fill out the order form with your subject, assignment type, page count, academic level, deadline, and instructions.',
          "Add any files or materials your consultant will need.",
          'Submit your order — it can be posted as open (visible to all consultants) or sent privately to someone specific.',
          'Review proposals and select a consultant, or confirm your chosen consultant for a private order.',
          'Fund your order so your consultant can begin work, with your payment held safely until you approve the final result.'
        ]},
        {t:'h', v:'Before You Submit'},
        {t:'p', v:'The clearer and more detailed your instructions, the better the match and the smoother the process — so include any rubrics, formatting requirements, or reference materials upfront if you have them.'}
      ]
    },
    {
      title: 'Type of service',
      subtitle: 'What kinds of help can I request?',
      body: [
        {t:'h', v:'Available Service Types'},
        {t:'p', v:"When placing an order, you'll choose the type of help you need:"},
        {t:'ul', items:[
          'Writing — a consultant creates a new piece of work from scratch based on your instructions.',
          "Editing — a consultant reviews and improves an existing draft you've already written.",
          'Proofreading — a consultant checks your finished work for grammar, clarity, and formatting without making structural changes.',
          'Consultation/Coaching — guidance and feedback on your approach, methodology, or structure, without the consultant producing the final text themselves.'
        ]},
        {t:'h', v:'Choosing the Right One'},
        {t:'p', v:"If you're unsure which type fits your situation, our support team can help you decide, or you can outline your needs in the order instructions and let your consultant confirm the best fit."}
      ]
    }
  ]
},
{
  id: 'managing-order',
  title: 'Managing The Order',
  articles: [
    {
      title: "Can't upload files. The file is too large or unsupported.",
      subtitle: "What do I do if my file won't upload?",
      body: [
        {t:'h', v:'File Size Limits'},
        {t:'p', v:'Our platform accepts individual files up to a set size limit. If your file is too large, try one of these:'},
        {t:'ul', items:[
          'Compress the file (zip it, or reduce image/document size) before uploading.',
          'Split large documents into smaller sections and upload them separately.',
          "Use a shared cloud link (Google Drive, Dropbox) and paste it into your order chat instead, if the file still won't fit."
        ]},
        {t:'h', v:'Supported File Types'},
        {t:'p', v:'We support common formats like DOCX, PDF, XLSX, PPTX, JPG, and PNG. If your file is in an unsupported format:'},
        {t:'ul', items:[
          'Convert it to PDF or DOCX, which are accepted almost universally.',
          "Contact support if you're not sure how to convert it — we're happy to help."
        ]},
        {t:'p', v:"If you continue having trouble after trying these steps, reach out to our 24/7 support team with a description of the error, and we'll assist you directly."}
      ]
    },
    {
      title: 'I am not happy with the finished paper',
      subtitle: "What can I do if the delivered work isn't right?",
      body: [
        {t:'h', v:"You're Protected"},
        {t:'p', v:"You are never required to release payment for work that doesn't meet your original instructions. Here's how to resolve it:"},
        {t:'ul', items:[
          'Request a revision through the order chat, pointing to the specific requirements that weren\u2019t met. Revisions are free as long as they align with your original instructions.',
          'Message your consultant directly if the issue is something quick to clarify or fix.',
          "Contact our support team if the revision doesn't resolve things, or if you'd like a neutral party to review the situation. We can help mediate, reassign the order, or process a refund if appropriate under our money-back guarantee."
        ]},
        {t:'h', v:'Tips to Avoid This'},
        {t:'p', v:'Providing clear, detailed instructions and any grading rubrics upfront helps consultants deliver work that matches your expectations the first time.'}
      ]
    },
    {
      title: 'How can I check my order progress?',
      subtitle: 'Where do I track the status of my order?',
      body: [
        {t:'h', v:'Tracking Your Order'},
        {t:'p', v:"You can check your order's status anytime from your account dashboard, which shows whether it's:"},
        {t:'ul', items:['Awaiting a consultant','In progress','Delivered and awaiting your review','Completed']},
        {t:'h', v:'Staying Updated'},
        {t:'p', v:"Open your order page to see any messages, drafts, or files your consultant has shared. You'll also receive notifications when there's an update, so you don't need to check constantly. If you'd like a status update directly from your consultant, you can message them anytime through the order chat."}
      ]
    },
    {
      title: 'Can I add extra money to my order after I have paid?',
      subtitle: 'What if my order needs more budget?',
      body: [
        {t:'h', v:'Yes, You Can Top Up'},
        {t:'p', v:"If your order's scope changes — for example, you need more pages, extra revisions beyond the original request, or added services — you can add funds to your existing order at any time."},
        {t:'h', v:'How To Do It'},
        {t:'ul', items:[
          'Go to your order page.',
          'Select the option to add funds or increase the order budget.',
          'Confirm the additional amount, which is added to your secure balance for that order.'
        ]},
        {t:'p', v:"Your consultant will be notified of the update so they can adjust their work accordingly. This is common when instructions change mid-project or when you decide to add extra pages or services."}
      ]
    },
    {
      title: 'Order expired',
      subtitle: 'What does it mean if my order has expired, and what can I do?',
      body: [
        {t:'h', v:'Why Orders Expire'},
        {t:'p', v:'An order can expire if it goes unfunded for too long, if no consultant is selected within a certain time, or if the deadline passes without the order being completed or extended.'},
        {t:'h', v:'What To Do Next'},
        {t:'ul', items:[
          'Check your order page for the exact reason shown.',
          "If it expired before a consultant was hired, you can simply repost it or adjust the details (deadline, budget) to make it easier to fill.",
          'If it expired mid-process, contact support right away — we can help recover the order, connect you with a consultant, or process a refund if funds were already held.'
        ]},
        {t:'h', v:'Avoiding Expiration'},
        {t:'p', v:"Try to select a consultant promptly and keep your deadline realistic when placing the order, so it doesn't sit unfilled for too long."}
      ]
    },
    {
      title: 'How to change the deadline?',
      subtitle: "Can I extend or shorten my order's due date?",
      body: [
        {t:'h', v:'Changing Your Deadline'},
        {t:'ul', items:['Open your order page.','Select the option to edit or update the deadline.','Enter your new deadline and confirm.']},
        {t:'h', v:'A Few Things to Know'},
        {t:'ul', items:[
          'Your consultant will be notified immediately of any deadline change.',
          "Shortening a deadline may require your consultant's confirmation that the new timeline is workable, and could affect pricing.",
          'Extending a deadline is straightforward and gives your consultant more time to deliver quality work.'
        ]},
        {t:'p', v:"If you're unsure whether a deadline change is possible for your specific order, message your consultant directly or reach out to support for help."}
      ]
    },
    {
      title: 'How to resubmit the order?',
      subtitle: 'What if my order needs to be reopened or reworked?',
      body: [
        {t:'h', v:"When You'd Resubmit"},
        {t:'p', v:"You might need to resubmit an order if a consultant wasn't able to complete it, if you need to reopen it for a new consultant, or if significant changes mean it makes more sense to restart than to revise."},
        {t:'h', v:'Steps to Resubmit'},
        {t:'ul', items:[
          'Go to your order page and select the resubmit or repost option.',
          'Review and update the instructions, deadline, or budget if anything has changed.',
          'Confirm to make the order visible again for consultants to pick up (or send it privately to a specific consultant).'
        ]},
        {t:'p', v:"Your existing funds and files stay linked to the order, so you don't need to start completely from scratch. If you run into trouble resubmitting, our support team can do this for you."}
      ]
    },
    {
      title: 'How to resubmit the order? (Mobile)',
      subtitle: 'Resubmitting an order from the mobile app',
      body: [
        {t:'h', v:'On Mobile'},
        {t:'ul', items:[
          'Open the app and go to My Orders.',
          "Tap into the order you'd like to resubmit.",
          'Tap the menu (\u22EF) or Resubmit option on the order page.',
          'Review your instructions and deadline, make any updates needed, and confirm.'
        ]},
        {t:'p', v:"The process mirrors the desktop version — your files and payment stay attached to the order. If the resubmit option isn't visible on your screen, update the app to the latest version or contact support for assistance."}
      ]
    },
    {
      title: 'How to change the order size?',
      subtitle: 'Can I adjust the page count or scope after ordering?',
      body: [
        {t:'h', v:'Adjusting Order Size'},
        {t:'p', v:'If your assignment requirements change — more pages needed, a shorter scope, additional sections — you can update your order size directly.'},
        {t:'ul', items:[
          'Open your order page.',
          'Select the option to edit order details.',
          'Update the page count or scope, and add any extra funds if the change increases the total cost.'
        ]},
        {t:'h', v:'Note for Consultants'},
        {t:'p', v:'Your consultant will be notified of the change and may confirm the new scope is workable within your deadline. For major changes, briefly explain the reason in the order chat.'}
      ]
    },
    {
      title: 'How to Add Extra Instructions or Attach Files to My Order?',
      subtitle: 'Can I update my order after submitting it?',
      body: [
        {t:'h', v:'Yes, Anytime'},
        {t:'p', v:'You can add clarifications, extra instructions, or additional files to an active order at any point during the process.'},
        {t:'ul', items:[
          'Go to your order page.',
          'Use the message box in the order chat to send new instructions or attach files.',
          'Your consultant will receive a notification and can factor the update into their work.'
        ]},
        {t:'h', v:'Best Practice'},
        {t:'p', v:"If you're adding something important — like a new rubric or a change in topic focus — flag it clearly in your message so your consultant doesn't miss it, especially if the order is already in progress."}
      ]
    },
    {
      title: 'How can I view my archived orders?',
      subtitle: 'Where do past or completed orders go?',
      body: [
        {t:'h', v:'Finding Archived Orders'},
        {t:'p', v:'Completed or older orders are moved to your Archive so your active dashboard stays uncluttered.'},
        {t:'ul', items:[
          'Go to your account dashboard.',
          'Select Orders, then look for an Archived or Completed tab/filter.',
          'Click into any archived order to view its full details, files, and chat history.'
        ]},
        {t:'p', v:'Archived orders remain accessible at any time — nothing is deleted, so you can always revisit past work, download files again, or reference previous instructions for future orders.'}
      ]
    },
    {
      title: 'How to Replace or Duplicate an Order?',
      subtitle: "Can I reuse a previous order's details for a new one?",
      body: [
        {t:'h', v:'Duplicating an Order'},
        {t:'p', v:'If you need a similar assignment done again — for example, a new chapter with the same formatting requirements — you can duplicate a previous order instead of starting from scratch.'},
        {t:'ul', items:[
          'Open the original order from your order history or archive.',
          'Select the Duplicate option.',
          'Adjust the instructions, deadline, or page count as needed for the new task, then submit.'
        ]},
        {t:'h', v:'Replacing an Order'},
        {t:'p', v:"If an order needs to be replaced entirely — for instance, the consultant couldn't complete it — you can cancel or resubmit it and select a new consultant, with your existing funds carried over. Contact support if you'd like help transferring details from one order to a new one."}
      ]
    }
  ]
},
{
  id: 'receiving-order',
  title: 'Receiving Your Order',
  articles: [
    {
      title: 'How will I receive the completed order?',
      subtitle: 'Where does my finished work show up?',
      body: [
        {t:'h', v:'Delivery Through Your Order Page'},
        {t:'p', v:"Once your consultant finishes the work, they'll upload the final draft directly to your order page — you don't need to request it separately. You'll get a notification as soon as it's ready."},
        {t:'h', v:'What You Can Do Next'},
        {t:'ul', items:[
          'Open the order and download the delivered files.',
          'Review the work against your original instructions.',
          "Request revisions through the order chat if anything needs adjusting, or approve and release payment if you're satisfied."
        ]},
        {t:'h', v:'A Few Notes'},
        {t:'p', v:"All delivered files remain accessible in your order history (and later in your archive) even after the order is complete. If you don't see the delivery when expected, check your notifications settings or reach out to support to confirm the order status."}
      ]
    },
    {
      title: "What to do if the expert doesn't upload the paper on time?",
      subtitle: 'My deadline has passed with no delivery — now what?',
      body: [
        {t:'h', v:'First Steps'},
        {t:'ul', items:[
          'Check the order chat — your consultant may have left a message explaining a delay or asking for an extension.',
          "Message them directly to ask for a status update if you haven't heard anything."
        ]},
        {t:'h', v:"If There's No Response"},
        {t:'p', v:'If your deadline has passed with no delivery or explanation, contact our 24/7 support team right away. We can:'},
        {t:'ul', items:[
          "Reach out to the consultant on your behalf.",
          'Reassign your order to another available consultant.',
          "Process a refund under our money-back guarantee if the order can't be completed."
        ]},
        {t:'h', v:'Your Payment Stays Protected'},
        {t:'p', v:"Because your funds are held securely until you approve the work, a missed deadline never means losing your money — we'll help make it right."}
      ]
    },
    {
      title: 'How to request a refund?',
      subtitle: "What's the process for getting my money back?",
      body: [
        {t:'h', v:'When Refunds Apply'},
        {t:'p', v:'You may be eligible for a refund if:'},
        {t:'ul', items:[
          'Your consultant didn\u2019t deliver the work as agreed or missed the deadline without resolution.',
          "The final draft doesn't meet your original instructions even after revisions.",
          'Your order needs to be canceled before meaningful work has begun.'
        ]},
        {t:'h', v:'How to Request One'},
        {t:'ul', items:[
          'Go to your order page and select the refund or dispute option, or contact support directly through the chat widget.',
          'Explain the issue and reference your original order instructions.',
          'Our team will review the order details, chat history, and delivered work (if any) to determine the outcome.'
        ]},
        {t:'h', v:'What Happens Next'},
        {t:'p', v:"Since your payment is held securely until you approve the work, eligible refunds are processed back to your account without hassle. If you're unsure whether your situation qualifies, reach out to support, and we'll walk you through it."}
      ]
    }
  ]
},
{
  id: 'quality',
  title: 'Quality and Satisfaction',
  articles: [
    {
      title: 'How can I make sure that the received order is unique?',
      subtitle: 'Originality of the assignment',
      body: [
        {t:'p', v:'We take originality extremely seriously. Our consultants are required to follow strict academic integrity standards, hold verified qualifications in their field, and produce properly cited, original content for every order. Plagiarized or recycled work is never acceptable on our platform.'},
        {t:'p', v:'To back this up, we offer plagiarism and AI-detection reports that give you clear, verifiable insight into how original your delivered work is — especially useful if you want extra peace of mind before submitting.'},
        {t:'h', v:'How to Get an Originality Report for Your Paper'},
        {t:'p', v:'You can request a plagiarism and/or AI-detection report when placing your order, or add it afterward from your order page. The report is generated once your consultant delivers the final draft and is attached directly to your order for you to download.'},
        {t:'h', v:'Originality Checks in More Detail'},
        {t:'p', v:'Our reports are run through trusted third-party plagiarism and AI-detection tools that compare your paper against a wide database of academic and online sources. The resulting report shows a similarity/originality percentage along with highlighted sections, so you can see exactly where any matches occur (such as properly cited normal quotes).'},
        {t:'h', v:'FAQs'},
        {t:'ul', items:[
          'Is the report free? A basic originality report can be added at a small additional cost; check your order options for current pricing.',
          "When will I get it? It's generated and delivered alongside your final paper.",
          "What if the report shows issues? Contact your consultant or support immediately — this is rare, and we'll investigate and resolve it, including a revision or refund if warranted."
        ]},
        {t:'h', v:'What if My Institution Uses a Specific Plagiarism Checker?'},
        {t:'p', v:"If your school requires a specific tool (such as Turnitin), let us know when placing your order or in your order chat. While we can't guarantee access to every proprietary university system, we'll do our best to accommodate your request or provide a comparable report from a trusted alternative."}
      ]
    },
    {
      title: 'How to request a plagiarism or AI report?',
      subtitle: 'Getting written proof of originality',
      body: [
        {t:'h', v:'Requesting the Report'},
        {t:'ul', items:[
          "When placing your order, look for the plagiarism/AI report add-on and select it.",
          "If you've already placed your order, open your order page and add the report option from there — you can request it any time before delivery.",
          "Once your consultant submits the final draft, the report is generated and attached to your order automatically."
        ]},
        {t:'h', v:"What's Included"},
        {t:'p', v:'The report shows an originality percentage and flags any matched text, so you can confirm the work is properly written and cited before you submit it.'},
        {t:'p', v:"If you need a report after delivery and didn't add it upfront, contact support — we can usually still arrange one for you."}
      ]
    },
    {
      title: 'Do you have a money-back guarantee policy?',
      subtitle: "What if I'm not satisfied?",
      body: [
        {t:'h', v:'Yes, We Do'},
        {t:'p', v:'Our money-back guarantee protects you if:'},
        {t:'ul', items:[
          'Your consultant fails to deliver the work as agreed or misses the deadline without resolution.',
          "The final draft still doesn't meet your original instructions after revisions.",
          'You need to cancel before substantial work has begun.'
        ]},
        {t:'h', v:'How It Works'},
        {t:'p', v:"Because your payment stays in your account balance until you approve the delivered work, you're never forced to release funds for something that doesn't meet your requirements. If a refund is warranted, contact our support team through the chat widget, explain the issue, and we'll review your order and process it accordingly."}
      ]
    },
    {
      title: 'How can I leave a review/rate my expert?',
      subtitle: 'Sharing feedback on your consultant',
      body: [
        {t:'h', v:'Leaving a Rating'},
        {t:'ul', items:[
          'Go to your completed order.',
          'Look for the Rate Your Expert or Leave a Review option on the order page.',
          'Select a star rating and add a short written review describing your experience.'
        ]},
        {t:'h', v:'Why It Matters'},
        {t:'p', v:"Your feedback helps other students choose the right consultant and helps us maintain quality across the platform. Reviews are tied to the consultant's profile, so honest, specific feedback (what went well, what could improve) is always appreciated."},
        {t:'p', v:'You can leave a review any time after your order is marked complete.'}
      ]
    },
    {
      title: 'How to request a revision?',
      subtitle: 'Getting changes made to your delivered work',
      body: [
        {t:'h', v:'Requesting a Revision'},
        {t:'ul', items:[
          'Open your order page and locate the delivered draft.',
          'Select the Request Revision option, or message your consultant directly in the order chat.',
          'Clearly describe what needs to change, referencing your original instructions where possible.'
        ]},
        {t:'h', v:'Tips for a Smooth Revision'},
        {t:'ul', items:[
          'Be specific — point to exact sections, requirements, or feedback from your instructor.',
          "Attach any relevant files, such as a grading rubric or professor's comments.",
          'Set a reasonable timeframe if you have a new deadline in mind.'
        ]},
        {t:'p', v:'Revisions are included at no extra cost as long as they align with your original order instructions. If a revision request goes unresolved, our support team is available to step in.'}
      ]
    },
    {
      title: 'How can I ensure the received work is free from AI-generated content?',
      subtitle: 'Confirming your paper was written by a human',
      body: [
        {t:'h', v:'Our Standard'},
        {t:'p', v:'We have a strict no-AI-shortcuts policy. Every consultant is expected to write original content themselves — not generate it with AI tools — and our internal guidelines are built around producing genuinely human, well-researched work.'},
        {t:'h', v:'How to Verify'},
        {t:'p', v:'You can request an AI-detection report, which is generated alongside your delivered paper and checks the writing against leading AI-detection tools. This gives you a clear, shareable result if you want written confirmation before submitting.'},
        {t:'h', v:'If You Have Concerns'},
        {t:'p', v:'If anything about your delivered work seems off, reach out to support with specifics — we take these concerns seriously. We will investigate, including offering a revision or refund if our standards weren\u2019t met.'}
      ]
    }
  ]
},
{
  id: 'experts',
  title: 'Questions About Experts Explained',
  articles: [
    {
      title: 'Who are the experts?',
      subtitle: 'Getting to know our consultants',
      body: [
        {t:'p', v:"We're selective about who joins ThesisArcPro, because the quality of your project depends entirely on the person working on it. Every consultant goes through a thorough vetting process before they're allowed to take on orders."},
        {t:'h', v:'What Our Consultants Have in Common'},
        {t:'ul', items:[
          'Strong command of academic English and writing',
          'At least 5 years of academic writing or research experience',
          'Advanced degrees relevant to their subject area',
          'Proven ability to meet tight deadlines without sacrificing quality',
          'A track record of following instructions precisely'
        ]},
        {t:'h', v:'Verifying the Right Fit Yourself'},
        {t:'p', v:'Beyond our vetting, you have direct visibility too. Before hiring anyone, you can review their profile, ratings, and past feedback, and chat with them directly through the order chat to confirm they understand your topic and requirements.'},
        {t:'h', v:'Our Commitment'},
        {t:'p', v:"Every consultant on the platform is here because they've demonstrated real expertise and reliability — so you can trust your project is in capable hands from day one."}
      ]
    },
    {
      title: 'Why is my expert not responding?',
      subtitle: 'What to do about a quiet consultant',
      body: [
        {t:'h', v:'Common Reasons for a Delay'},
        {t:'ul', items:[
          "They're working across time zones, and it's outside their active hours.",
          "They're deep in drafting and haven't checked messages recently.",
          'A technical issue is preventing notifications from coming through.'
        ]},
        {t:'h', v:'What You Can Do'},
        {t:'ul', items:[
          'Give it a little time — most consultants respond within a few hours during their active hours.',
          'Send a follow-up message in the order chat with a clear, specific question so it\u2019s easy to respond to quickly.',
          "If there's been no response for an extended period, especially close to your deadline, contact our 24/7 support team. We can check in with the consultant directly or help you find a replacement if needed."
        ]},
        {t:'p', v:"Your payment stays protected the entire time, so a slow response never puts your funds at risk."}
      ]
    },
    {
      title: 'Can I chat with the expert before hiring them?',
      subtitle: 'Getting to know a consultant before you commit',
      body: [
        {t:'h', v:'Yes, Always'},
        {t:'p', v:"Once you've placed your order and received proposals, you're welcome to message any consultant who's shown interest before making your final decision."},
        {t:'h', v:'What to Ask'},
        {t:'ul', items:[
          'Their experience with your specific subject or topic',
          "How they'd approach your assignment",
          'Whether your deadline and requirements are realistic for them',
          'Examples of similar work they\u2019ve done (without sharing other students\u2019 actual papers)'
        ]},
        {t:'p', v:"This conversation helps you confirm they're the right fit before any funds are committed to that consultant, so take the time to ask what matters to you."}
      ]
    },
    {
      title: 'How to rehire an expert?',
      subtitle: 'Working with the same consultant again',
      body: [
        {t:'h', v:'If You Had a Good Experience'},
        {t:'p', v:'You can easily work with the same consultant on a new project.'},
        {t:'ul', items:[
          'Visit their profile directly (from your order history or by searching their name), or',
          'Place a new order and select the Private Order option, sending it straight to that consultant.'
        ]},
        {t:'h', v:'Why Rehire?'},
        {t:'p', v:"Working with a consultant who already understands your writing style, program requirements, or ongoing project (like sequential dissertation chapters) often leads to a smoother, faster process. If they're unavailable for your new deadline, our support team can help you find someone with a similar background."}
      ]
    },
    {
      title: 'How to choose the best expert?',
      subtitle: 'Finding the right match for your project',
      body: [
        {t:'h', v:'What to Look At'},
        {t:'ul', items:[
          'Subject expertise — do they have direct experience in your field or topic?',
          'Ratings and reviews — what have previous students said about their work?',
          'Communication — do they respond clearly and understand your requirements when you chat with them?',
          'Availability — can they realistically meet your deadline?'
        ]},
        {t:'h', v:'Steps to Take'},
        {t:'ul', items:[
          'Post your order with clear, detailed instructions.',
          'Review the proposals you receive.',
          'Chat with a few top candidates to compare their approach.',
          'Choose the consultant who feels like the strongest match — not necessarily the cheapest or fastest option.'
        ]},
        {t:'p', v:"If you'd rather get a recommendation, our support team can suggest consultants based on your subject and requirements."}
      ]
    },
    {
      title: 'How to add writers to your Favorites?',
      subtitle: 'Saving consultants for future projects',
      body: [
        {t:'h', v:'Adding a Favorite'},
        {t:'ul', items:[
          "Visit the profile of a consultant you'd like to save.",
          'Look for the Add to Favorites (often a star or heart icon) option on their profile.',
          'Select it to save it to your list.'
        ]},
        {t:'h', v:'Why Use Favorites'},
        {t:'p', v:"If you've worked with a consultant you liked, saving them makes it quick to send them a private order for future assignments without searching again. You can view and manage your full list of favorited consultants from your account dashboard at any time."}
      ]
    }
  ]
},
{
  id: 'pricing',
  title: 'Pricing, Discounts, Payment Issues',
  articles: [
    {
      title: 'Where Will My Refund Go?',
      subtitle: 'Refund Policy: Original Payment Method Explained',
      body: [
        {t:'h', v:'Can Funds Be Returned to a Different Card?'},
        {t:'p', v:'No. Refunds can only be issued back to the original payment method used for that deposit.'},
        {t:'h', v:'Why Do Refunds Normally Go Back to the Same Card?'},
        {t:'p', v:"This is standard across the payment industry, not something specific to us. Card networks and banks require refunds to return to the original card for fraud prevention and accurate transaction tracking — and to avoid the issues that could arise from redirecting money to a card that isn't verified as yours."},
        {t:'h', v:'What If I Used Different Cards to Make a Payment?'},
        {t:'p', v:'If you funded your order using more than one card, your refund will be split proportionally and returned to each card according to how much was originally charged to it.'},
        {t:'h', v:'What If I No Longer Have Access to the Card I Used?'},
        {t:'p', v:"Contact your bank first — refunds to a closed or lost card are usually still received by the account holder, since the bank routes the funds internally. If your bank confirms they can't process it, reach out to our support team with details, and we'll work with you to find a resolution."},
        {t:'h', v:'What If I Used Apple Pay or a Similar Wallet?'},
        {t:'p', v:'Refunds for wallet-based payments (Apple Pay, Google Pay, etc.) are returned to the underlying card or account linked to that wallet at the time of payment.'},
        {t:'h', v:'Refund Processing Time'},
        {t:'p', v:'Once approved, refunds are typically processed within a few business days on our end, though your bank may take additional time (commonly 5\u201310 business days) to reflect it in your account.'}
      ]
    },
    {
      title: "The transaction failed. What can I do if my deposit didn't go through?",
      subtitle: 'Troubleshooting a failed payment',
      body: [
        {t:'h', v:'Common Causes'},
        {t:'ul', items:[
          'Insufficient funds or a card limit being reached',
          'Incorrect card details entered',
          'Your bank is blocking the transaction as a security precaution',
          'A temporary issue with the payment processor'
        ]},
        {t:'h', v:'What to Try'},
        {t:'ul', items:[
          'Double-check your card number, expiration date, and CVV for typos.',
          "Confirm with your bank that international or online transactions aren't blocked on your card.",
          'Try an alternative payment method if available.',
          'Wait a few minutes and try again, in case it was a temporary processing issue.'
        ]},
        {t:'p', v:"If the issue persists, contact our support team with the approximate time of the failed attempt — we can check the transaction on our end and help you complete your deposit."}
      ]
    },
    {
      title: 'How does assignment pricing work, and how can I minimize costs?',
      subtitle: 'Understanding what determines your price',
      body: [
        {t:'h', v:'What Affects Price'},
        {t:'ul', items:[
          'Academic level — high school, undergraduate, Master\u2019s, or PhD',
          'Page count — total length of the assignment',
          'Deadline — tighter deadlines cost more due to limited consultant availability',
          'Complexity — highly specialized or technical topics may affect consultant rates'
        ]},
        {t:'h', v:"What's Always Included Free"},
        {t:'p', v:'Formatting, title pages, reference lists, an editor quality check, and unlimited revisions are included in every order at no extra charge.'},
        {t:'h', v:'Tips to Minimize Cost'},
        {t:'ul', items:[
          'Place your order as early as possible — longer deadlines are significantly cheaper than urgent ones.',
          'Be precise about your actual page count and requirements to avoid overpaying for extra scope.',
          'Compare proposals from multiple consultants rather than accepting the first one.',
          'Watch for promo codes or seasonal discounts.'
        ]}
      ]
    },
    {
      title: 'Can I pay using PayPal? What about CashApp?',
      subtitle: 'Accepted payment methods',
      body: [
        {t:'h', v:'Supported Methods'},
        {t:'p', v:'We accept major debit and credit cards, along with several digital payment options. PayPal is generally supported as a payment method — check the payment screen at checkout, since available options can vary by region.'},
        {t:'h', v:'CashApp'},
        {t:'p', v:'CashApp is not typically supported as a direct payment method on the platform.'},
        {t:'h', v:"Can't Find Your Preferred Method?"},
        {t:'p', v:"If your preferred payment option isn't listed at checkout, contact support — we can confirm what's available in your region and let you know about any alternatives."}
      ]
    },
    {
      title: 'Do you offer any Promo codes?',
      subtitle: 'Discounts and how to use them',
      body: [
        {t:'h', v:'Where to Find Discounts'},
        {t:'p', v:'We occasionally run promotions for new and returning students. Keep an eye on:'},
        {t:'ul', items:['Our website homepage and email newsletters','Announcements shared through the chat widget','Seasonal or first-order discount offers']},
        {t:'h', v:'How to Apply a Promo Code'},
        {t:'ul', items:[
          'When placing your order or at checkout, look for a Promo Code or Discount Code field.',
          'Enter your code exactly as provided.',
          'Confirm that the discount has been applied to your total before completing payment.'
        ]},
        {t:'p', v:"If you have a code that isn't working, contact support with the code and order details, and we'll check it for you."}
      ]
    },
    {
      title: 'Currency and Bank Fees',
      subtitle: 'Understanding extra charges on your statement',
      body: [
        {t:'h', v:'Currency Conversion'},
        {t:'p', v:"If you're paying in a currency different from the one your card is issued in, your bank or card network may apply a currency conversion, which can result in a slightly different final charge than the listed price."},
        {t:'h', v:'Bank or Processing Fees'},
        {t:'p', v:"Some banks charge their own international transaction or foreign exchange fees, separate from anything we charge. These fees go directly to your bank, not to us."},
        {t:'h', v:'What You Can Do'},
        {t:'ul', items:[
          'Check with your bank about their foreign transaction fee policy before paying.',
          "Use a card that doesn't charge foreign transaction fees, if available to you.",
          'Contact your bank directly if you notice an unexpected extra charge, since these fees are set and applied by them.'
        ]}
      ]
    },
    {
      title: 'My payment is pending. What should I do?',
      subtitle: 'Understanding a pending transaction',
      body: [
        {t:'h', v:'What "Pending" Means'},
        {t:'p', v:"A pending status usually means your bank or payment processor is still verifying or finalizing the transaction — it hasn't failed, but it also hasn't been fully confirmed yet."},
        {t:'h', v:'What to Do'},
        {t:'ul', items:[
          'Wait a short while, as most pending payments resolve automatically within a few minutes to a few hours.',
          'Avoid attempting the payment again immediately to prevent a duplicate charge.',
          "Check your bank app or statement — if it clears on their end, it should reflect on your account balance shortly after."
        ]},
        {t:'p', v:"If your payment is still pending after 24 hours, contact our support team with the transaction details so we can look into it directly."}
      ]
    },
    {
      title: 'How to add a new card to deposit the funds',
      subtitle: 'Adding a payment method to your account',
      body: [
        {t:'h', v:'Adding a Card'},
        {t:'ul', items:[
          'Go to your account settings or the payment/billing section.',
          'Select Add Payment Method or Add Card.',
          'Enter your card details (number, expiration date, CVV, and billing information).',
          'Save the card — it will now be available to use for deposits.'
        ]},
        {t:'h', v:'At Checkout'},
        {t:'p', v:"You can also add a new card directly during checkout if it's your first time using it, without needing to go through account settings separately."},
        {t:'p', v:'Your payment information is stored securely and is never shared with consultants or other users.'}
      ]
    },
    {
      title: "Where's my refund?",
      subtitle: 'Checking the status of a refund',
      body: [
        {t:'h', v:'Where to Check'},
        {t:'p', v:'Visit your order or payment history in your account dashboard — approved refunds are marked there along with the date they were processed on our end.'},
        {t:'h', v:'Typical Timeline'},
        {t:'p', v:'Refunds are usually processed within a few business days after approval. From there, your bank may take additional time (commonly 5\u201310 business days) to post it to your account, depending on your card issuer.'},
        {t:'h', v:"If It's Taking Longer Than Expected"},
        {t:'ul', items:[
          'Confirm the refund was approved and processed on our side by checking your order/payment history.',
          "Check with your bank, since delays are often on their end once funds have been sent.",
          "Contact our support team with your order number if it's been longer than 10 business days — we'll investigate and follow up with you directly."
        ]}
      ]
    },
    {
      title: 'How to delete the card from my account',
      subtitle: 'Removing a saved payment method',
      body: [
        {t:'h', v:'Removing a Card'},
        {t:'ul', items:[
          'Go to your account settings and open the payment/billing section.',
          "Find the card you'd like to remove.",
          'Select Delete or Remove next to that card and confirm.'
        ]},
        {t:'h', v:'A Few Notes'},
        {t:'ul', items:[
          'You can add a new card at any time after removing one.',
          "If the card is linked to an active, unfunded order, you may need to add an alternative payment method first to complete that order.",
          "Removing a card doesn't affect any funds already deposited to your account balance."
        ]}
      ]
    }
  ]
},
{
  id: 'account',
  title: 'Managing Your Account',
  articles: [
    {
      title: 'How to restore the password?',
      subtitle: 'What to do if I forgot my password',
      body: [
        {t:'h', v:'Resetting Your Password'},
        {t:'ul', items:[
          'On the login page, select Forgot Password.',
          'Enter the email address linked to your account.',
          'Select Send reset link.',
          'Check your inbox for the password reset email.',
          'Click the link in the email and choose a new password.'
        ]},
        {t:'h', v:"If You Don't Receive the Reset Email"},
        {t:'ul', items:[
          "Double-check that you're entering the same email address you originally registered with.",
          'Check your spam or junk folder, in case the email was filtered there.',
          'Wait a few minutes, since delivery can occasionally be delayed.'
        ]},
        {t:'h', v:'Still Stuck?'},
        {t:'p', v:"If none of the above works, contact our support team. Once we've verified your account, we'll help you regain access and reset your password directly."}
      ]
    },
    {
      title: 'How can I change my email or phone number?',
      subtitle: 'Updating your account contact details',
      body: [
        {t:'h', v:'Changing Your Email'},
        {t:'ul', items:[
          'Go to your account settings.',
          'Select Edit next to your email address.',
          'Enter your new email and confirm the change, usually via a verification link sent to the new address.'
        ]},
        {t:'h', v:'Changing Your Phone Number'},
        {t:'ul', items:[
          'Go to your account settings.',
          'Select Edit next to your phone number.',
          'Enter the new number and confirm, following any verification steps shown.'
        ]},
        {t:'h', v:"If You Can't Access Your Account"},
        {t:'p', v:"If you've lost access to your account and can't update these details yourself (for example, you no longer have your old email), contact support. After verifying your identity, we'll help you update your contact information securely."}
      ]
    },
    {
      title: 'How to delete the account?',
      subtitle: 'Closing your ThesisArcPro account',
      body: [
        {t:'h', v:'Before You Delete'},
        {t:'p', v:"Make sure you've downloaded any files or completed orders you want to keep — deleting your account may remove access to your order history and delivered work."},
        {t:'h', v:'Requesting Deletion'},
        {t:'ul', items:[
          'Go to your account settings and look for an account deletion or deactivation option, or',
          'Contact our support team directly and request account deletion.'
        ]},
        {t:'h', v:'What Happens Next'},
        {t:'p', v:'Our team will confirm your request, check for any active orders or pending balances that need to be resolved first, and then process the deletion. If you have funds remaining in your account balance, we\u2019ll help you withdraw or refund them before closing the account.'}
      ]
    },
    {
      title: 'Balance Page',
      subtitle: 'Understanding your account balance',
      body: [
        {t:'h', v:'What the Balance Page Shows'},
        {t:'p', v:"Your balance page gives you a full overview of your account's financial activity, including:"},
        {t:'ul', items:['Funds currently held for active orders','Available balance not tied to any order','Deposit and refund history','Payment methods on file']},
        {t:'h', v:'Using Your Balance'},
        {t:'p', v:'Funds deposited into your account are held securely until you approve delivered work, at which point they\u2019re released to your consultant. You can also add funds in advance, top up an existing order, or use available balance toward a new order.'},
        {t:'h', v:'Checking Transaction Details'},
        {t:'p', v:'Select any entry in your balance history to see more details, such as which order it\u2019s linked to, the date, and the amount. If something looks incorrect, contact support with the transaction details, and we\u2019ll look into it.'}
      ]
    }
  ]
},
{
  id: 'documents',
  title: 'Mastering Your Documents: FAQs and Guides',
  description: 'How to share Google Docs, how to convert files and open files with Microsoft Office',
  articles: [
    {
      title: "I can't access the Microsoft Word file provided by the expert. What can I do?",
      subtitle: "Opening a DOCX file when you don't have Word",
      body: [
        {t:'h', v:'Free Ways to Open It'},
        {t:'ul', items:[
          'Google Docs: Upload the file to Google Drive, then right-click it and select Open with > Google Docs. This works even without a Microsoft account.',
          'Microsoft Word Online: Use the free web version of Word through a Microsoft (Outlook/Hotmail) account — no paid subscription required.',
          'LibreOffice or OpenOffice: Free desktop programs that open and edit Word files.'
        ]},
        {t:'h', v:"If the File Still Won't Open"},
        {t:'ul', items:[
          "Confirm the file didn't get corrupted during download — try downloading it again from your order page.",
          'Ask your consultant to also export a PDF copy, which is viewable on virtually any device.',
          "Contact our support team if the issue continues — we're happy to help troubleshoot or request an alternate format."
        ]}
      ]
    },
    {
      title: 'How can I convert a Word document into a Google Drive document?',
      subtitle: 'Turning a DOCX file into an editable Google Doc',
      body: [
        {t:'h', v:'Steps'},
        {t:'ul', items:[
          'Open Google Drive and sign in.',
          'Click New > File Upload, then select your Word document.',
          'Once uploaded, right-click the file in Drive.',
          'Select Open with > Google Docs.'
        ]},
        {t:'p', v:'Google Docs will automatically convert the file into an editable Google Doc, which you can now edit, comment on, or share directly from Drive. Your original Word file remains untouched in Drive as a separate copy, unless you choose to delete it.'}
      ]
    },
    {
      title: 'How do I share a Google Doc with my teacher?',
      subtitle: 'Sending your document for review or submission',
      body: [
        {t:'h', v:'Sharing Steps'},
        {t:'ul', items:[
          'Open your document in Google Docs.',
          'Click the Share button in the top-right corner.',
          "Enter your teacher's email address.",
          'Choose their permission level — Viewer, Commenter, or Editor — depending on what you want them to be able to do.',
          'Click Send.'
        ]},
        {t:'h', v:'Alternative: Share a Link'},
        {t:'p', v:'Instead of entering an email, you can click Get Link, set the link\u2019s access level (for example, "Anyone with the link can view"), and copy the link to send however your teacher prefers — email, LMS, or messaging app.'}
      ]
    },
    {
      title: 'How do I convert a Google Doc into PDF format?',
      subtitle: 'Exporting your document as a PDF',
      body: [
        {t:'h', v:'Steps'},
        {t:'ul', items:[
          'Open your document in Google Docs.',
          'Click File in the top menu.',
          'Select Download, then choose PDF Document (.pdf).',
          "The PDF will save to your device's default download location."
        ]},
        {t:'h', v:'Tip'},
        {t:'p', v:"Converting to PDF is a good idea before submitting your work if your school requires a fixed, non-editable format, or if you want to make sure formatting stays consistent across different devices and programs."}
      ]
    },
    {
      title: 'How can I open files that Microsoft Office does not support?',
      subtitle: 'Handling unfamiliar or unsupported file types',
      body: [
        {t:'h', v:'Common Alternatives by File Type'},
        {t:'ul', items:[
          'Google Workspace apps (Docs, Sheets, Slides) can open many file types that Word, Excel, or PowerPoint may not natively support.',
          'LibreOffice/OpenOffice supports a wide range of formats, including older or less common file types.',
          'Online converters can convert unusual file types (like .odt, .rtf, or .pages) into a more universal format, such as PDF or DOCX.'
        ]},
        {t:'h', v:"If You're Still Stuck"},
        {t:'p', v:"Let your consultant know which format works best for you before they deliver — they're usually happy to export your file in an alternative format (like PDF or a Google Doc link) if the original doesn't open on your system. You can also reach out to our support team for guidance on handling a specific file type."}
      ]
    }
  ]
}
];