export const projectsData = [
  {
    id: 1,
    name: 'WA Support AI – WhatsApp AI Assistant',
    description:
      "Architected and developed a RAG-powered WhatsApp AI Support Assistant that enables context-aware customer support from business knowledge bases. Uses LangChain for orchestration, OpenAI GPT-4o-mini for generation, and MongoDB Atlas Vector Search for semantic retrieval over ingested documents. The assistant understands natural language queries, retrieves relevant context from vectorized business data, and delivers accurate, grounded responses — all via WhatsApp. Containerized with Docker for seamless deployment.",
    tools: ['NestJS', 'TypeScript', 'LangChain', 'OpenAI', 'MongoDB Atlas Vector Search', 'Docker'],
    role: 'Full Stack Engineer · TyrePlex',
    code: 'https://github.com/ramkrit/wa-support-ai',
    demo: '',
  },
  {
    id: 2,
    name: 'Omni-Channel Notification Microservice',
    description:
      "Independently designed and built a centralized Notification Microservice from scratch, capable of dispatching across 5 channels — Email, SMS, WhatsApp, App Push, and Web Push. Used BullMQ on Redis for reliable queueing, retries, and rate limiting, and Kafka topic-based events so any microservice can trigger notifications via pub/sub. Powers real-time order updates, dealer communications, and payment alerts across the ERP, Dealer App, and RM App. Replaced scattered, hard-coded notification logic in the legacy monolith with a single, scalable service.",
    tools: ['NestJS', 'TypeScript', 'Kafka', 'BullMQ', 'Redis', 'MySQL', 'AWS', 'Docker'],
    role: 'Full Stack Engineer · TyrePlex',
    code: '',
    demo: '',
  },
  {
    id: 3,
    name: 'Zoho Books Accounting Automation',
    description:
      "End-to-end accounting automation that integrates the in-house ERP with Zoho Books, owned and delivered independently. Automates Invoices, Purchase Bills, Credit Notes, Bank Transaction mapping, and Vendor / Customer management — all triggered by RMs directly from the ERP portal, removing manual data entry from the finance team. Handles tricky edge cases like partial payments, multi-vendor bills, and credit-note adjustments. Reduced manual accounting effort by ~80%, cut human errors, and unlocked real-time financial visibility for leadership.",
    tools: ['NestJS', 'TypeScript', 'Zoho Books API', 'Kafka', 'MySQL', 'Docker'],
    role: 'Full Stack Engineer · TyrePlex',
    code: '',
    demo: '',
  },
  {
    id: 4,
    name: 'Laboratory Information Management System (LIMS)',
    description:
      "Designed and built core backend modules for a healthcare LIMS platform — Test Management, Test Delivery, Costing, Invoicing, and Report Generation. Built the IAM module powering role-based auth across web and mobile, and shipped a clean RESTful API surface consumed by Android, iOS, and third-party lab integrations. Microservices architecture with real-time delivery-partner tracking for sample logistics. Used Azure Blob Storage and Azure Tables for scalable file management and NoSQL storage. Enabled end-to-end digital lab operations and cut test delivery turnaround time.",
    tools: ['NestJS', 'React.js', 'MySQL', 'Azure Blob Storage', 'Azure Tables', 'Docker', 'REST APIs'],
    role: 'Senior Backend Developer · Acetech',
    code: '',
    demo: '',
  },
  {
    id: 5,
    name: 'Zebra Workforce Management System',
    description:
      "End-to-end workforce management platform covering staff scheduling, roster management, leave tracking, job planning, and learning management. Integrated Azure AD for enterprise SSO and AWS S3 for secure document storage. Built admin dashboards for HR teams to manage allocation and track performance. Replaced manual Excel-based scheduling with automated, real-time roster management for enterprise clients.",
    tools: ['PHP (CodeIgniter)', 'MySQL', 'Azure AD (SSO)', 'AWS S3', 'DocuSign', 'BambooHR'],
    role: 'Senior Software Developer · Acetech',
    code: '',
    demo: '',
  },
  {
    id: 6,
    name: 'Seagate Logistics Platform',
    description:
      "Logistics and supply-chain platform for Seagate. Built automated invoice generation, multi-level invoice approval workflows, and backend APIs for shipment tracking, vendor management, and payment reconciliation. The workflow automation accelerated the invoice processing cycle and removed approval bottlenecks for the operations team.",
    tools: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    role: 'Backend Developer · Acetech',
    code: '',
    demo: '',
  },
];
