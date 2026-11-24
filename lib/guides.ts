// Plain-language guides that answer what people search when they feel stuck. Education only, with worked sums on made-up numbers.
// Every guide ends at the free tools. Nothing here is advice about a person's own situation.
export type Guide = { slug: string; title: string; description: string; intro: string; sections: { h: string; p: string[] }[]; cta: { text: string; href: string; label: string } };

const EX = 'Take a made-up month: $4,000 comes in, $2,200 goes to bills you can\'t skip, $1,000 goes to everything else, and $8,000 sits in savings.';

export const GUIDES: Guide[] = [
  {
    slug: 'how-many-months-of-savings-do-you-need',
    title: 'How many months of savings do you need?',
    description: 'The usual three to six month rule, how to work out your own number of months, and why the bills you can\'t skip matter more than your pay.',
    intro: 'You\'ll hear "three to six months" a lot. It\'s a rule of thumb, not a law. Here\'s what it measures and how to work out your own.',
    sections: [
      { h: 'What the rule is counting', p: ['The number of months is your savings divided by what you spend in a month. It answers one question: if the paychecks stopped, how long could you keep going?', 'Three to six months is the range most often quoted. People with one steady paycheck and few obligations sometimes aim lower. People whose pay swings, or who support others, often aim higher. Those are common patterns, not a verdict on anyone.'] },
      { h: 'A worked example', p: [EX + ' You spend $3,200 a month. $8,000 divided by $3,200 is 2.5, so this person could go about two and a half months with no income.', 'Count only what you\'d still have to pay. If you could cut the everything-else part to $600, the same savings would last $8,000 divided by $2,800, or about 2.9 months.'] },
      { h: 'What changes the answer', p: ['Bills you can\'t skip (rent, a car payment, insurance, minimum debt payments) set the floor. The more of your pay they take, the fewer months the same savings buy.', 'Other income counts too. A partner\'s pay, part-time work or severance each stretch the number.'] },
      { h: 'Your call', p: ['Nobody can tell you the right number of months for your life. It\'s a trade between safety now and what that money could do elsewhere. This is education, not advice.'] },
    ],
    cta: { text: 'Want your own number of months, worked out on your device?', href: '/start', label: 'See how long you could say no' },
  },
  {
    slug: 'can-i-afford-to-quit-my-job',
    title: 'Can I afford to quit my job? A way to work it out',
    description: 'A plain way to test whether you could leave a job: your monthly spending, your savings, the income you\'d still have, and the months that gives you.',
    intro: 'Wanting out of a job and being able to leave it are different questions. The second one has arithmetic you can check yourself.',
    sections: [
      { h: 'Step one: what you spend in a month', p: ['Add up the bills you can\'t skip, then everything else you spend. That\'s the amount you\'d need to cover each month after you leave. Use real statements, not memory. People usually guess low.'] },
      { h: 'Step two: what you\'d still have coming in', p: ['Count only income you\'re sure of after you leave: a partner\'s pay, part-time work, a pension. Leave out anything you\'re hoping for.'] },
      { h: 'Step three: divide', p: [EX + ' With no income at all, $8,000 covers about 2.5 months of $3,200. If $1,500 a month would still come in, the monthly shortfall is $1,700, and $8,000 lasts about 4.7 months.', 'Then ask how long it usually takes to find the next thing. If the answer is longer than your months, the plan has a gap.'] },
      { h: 'Things the sum leaves out', p: ['Health insurance, which often changes when a job ends. Taxes on severance or a final payout. A real chance that the next income starts lower. Each of these moves the number.'] },
      { h: 'Your call', p: ['This is a way to see the shape of the decision, not a green or red light. Some people leave with two months and a plan, others wait for twelve. What you do is your call. This is education, not advice.'] },
    ],
    cta: { text: 'Put your own numbers in. They stay on your device.', href: '/start', label: 'Check my months' },
  },
  {
    slug: 'what-a-new-monthly-payment-does-to-your-month',
    title: 'What a new monthly payment does to your month',
    description: 'How a car loan, lease or other new payment changes what is left each month, the share of your pay going to bills, and how long your savings would last.',
    intro: 'A payment of a few hundred dollars a month sounds small. Added to what you already owe each month, it can change more than one number.',
    sections: [
      { h: 'Three numbers move at once', p: ['What\'s left each month goes down by the full payment. The share of your pay going to bills you can\'t skip goes up. And the months your savings would last go down, because your monthly spending is now bigger.'] },
      { h: 'A worked example', p: [EX + ' $800 is left each month, bills take 55% of pay, and savings last 2.5 months.', 'Add a $520 monthly payment. What\'s left drops to $280. Bills take 68% of pay. Spending is now $3,720, so the savings last about 2.2 months, rounded down to 2.'] },
      { h: 'Why bills you can\'t skip are different', p: ['A payment you agreed to is hard to pause. Spending on food or fun can flex in a bad month. A loan payment usually can\'t. That\'s why people look at the share of pay going to the fixed part.'] },
      { h: 'Questions worth asking before you sign', p: ['What is the total cost over the whole term, not just the monthly figure? What happens if income drops for a few months? Is there a penalty for paying it off early?'] },
      { h: 'Your call', p: ['Whether the payment is worth it depends on what it buys you. This is arithmetic to look at first, not a recommendation. This is education, not advice.'] },
    ],
    cta: { text: 'Try a payment on your own numbers before you commit.', href: '/what-if', label: 'Try a what if' },
  },
  {
    slug: 'how-much-of-your-pay-goes-to-bills',
    title: 'How much of your pay goes to bills, and when it is a lot',
    description: 'What counts as a bill you can\'t skip, how to work out the share of your pay it takes, and what people often mean by "too much".',
    intro: 'Plenty of people feel squeezed without knowing why. One number often explains it: the share of pay that\'s already spoken for before the month starts.',
    sections: [
      { h: 'What counts', p: ['Bills you can\'t skip are the ones with a penalty if you miss them: rent or mortgage, utilities, insurance, minimum debt payments, a car payment, child care. Groceries and fuel are somewhere in between. Streaming and takeout are not on the list.'] },
      { h: 'How to work out the share', p: [EX + ' $2,200 divided by $4,000 is 0.55, so 55% of pay goes to bills you can\'t skip.', 'Use pay after tax, the money that actually lands in your account.'] },
      { h: 'Where "a lot" starts', p: ['There\'s no official line. A common rule of thumb says needs should take about half of take-home pay. Many people in expensive areas are well above that. Treat it as a way to notice the pattern, not a pass or fail mark.'] },
      { h: 'Why it matters more than the total', p: ['When half or more of your pay is fixed, a small drop in income reaches the part of the month you can\'t flex. That\'s when people feel stuck even with a decent paycheck.'] },
      { h: 'Your call', p: ['A high share isn\'t a character flaw. It often reflects rent, debt or a family. What you change, if anything, is your call. This is education, not advice.'] },
    ],
    cta: { text: 'See your own share worked out, on your device.', href: '/start', label: 'Work out my month' },
  },
  {
    slug: 'what-living-paycheck-to-paycheck-means',
    title: 'What living paycheck to paycheck actually means',
    description: 'A plain definition, a quick test using months of savings and what is left each month, and why it can happen at any income.',
    intro: 'The phrase gets used for very different situations. Here\'s a way to tell which one you\'re in.',
    sections: [
      { h: 'A working definition', p: ['If one missed paycheck would force you to skip a bill or borrow, your finances are running paycheck to paycheck. It describes the gap between money in and money out, and the cushion behind it. It doesn\'t depend on how much you earn.'] },
      { h: 'Two quick tests', p: ['Test one: what\'s left at the end of a normal month? If it\'s zero or negative, there\'s no slack. Test two: how many months could your savings cover? Under one month means a single surprise can cause a missed bill.', EX + ' This person has $800 left and 2.5 months of cushion. That\'s tight but not empty.'] },
      { h: 'Why it happens at high incomes too', p: ['Spending and fixed bills tend to rise with pay. A larger paycheck with a larger mortgage, car payment and child care can leave the same slack as a smaller one.'] },
      { h: 'What moves the two numbers', p: ['What\'s left each month changes with pay, fixed bills and everyday spending. The months of cushion change with savings and with total spending. Small changes to the second one compound over time because they build the cushion.'] },
      { h: 'Your call', p: ['These tests describe where you are. What to do about it depends on your life. This is education, not advice.'] },
    ],
    cta: { text: 'Find out where you are on both numbers.', href: '/start', label: 'Check my month' },
  },
  {
    slug: 'how-to-work-out-your-monthly-number',
    title: 'How to work out your monthly number in ten minutes',
    description: 'Four figures give you most of what you need: money in, bills you can\'t skip, everything else, and savings. Here is how to find each one.',
    intro: 'Most money questions start from four figures. You can gather them in ten minutes from your bank app and a pay stub.',
    sections: [
      { h: 'Money in', p: ['Take-home pay in a normal month, after tax. If pay varies, average the last three months. Only count income you can rely on.'] },
      { h: 'Bills you can\'t skip', p: ['Rent or mortgage, utilities, insurance, minimum debt payments, child care and any loan or lease. Look at the last two statements so you don\'t forget the annual ones divided by twelve.'] },
      { h: 'Everything else', p: ['Food, fuel, phone, subscriptions, fun. The quickest honest method is to take what left your account last month and subtract the bills above.'] },
      { h: 'Savings', p: ['Money you could reach within a few days without penalty. Leave out retirement accounts and anything tied up in a house.'] },
      { h: 'What you get from four numbers', p: [EX + ' Left each month: $4,000 minus $3,200, so $800. Share going to bills: 55%. Months your savings would cover: 2.5.', 'Those three results explain most of why a month feels tight or roomy.'] },
      { h: 'Your call', p: ['The numbers describe. They don\'t decide. This is education, not advice.'] },
    ],
    cta: { text: 'Enter your four numbers and see the three results. They stay on your device.', href: '/start', label: 'Start' },
  },
  {
    slug: 'why-your-money-and-your-life-feel-out-of-step',
    title: 'Why your money and your life can feel out of step',
    description: 'A plain way to check whether your spending matches what you say matters to you, using three groups: needs, things you would choose again, and the rest.',
    intro: 'You can pay every bill on time and still feel your money is not going where your life is. That gap is common, and you can look at it with a pencil.',
    sections: [
      { h: 'Start with what matters to you, in your words', p: ['Write down two or three things you want your money to serve. Not goals a planner would approve of. Yours: time with family, a trip every year, a year to try a business.', 'Nobody else can set this list. It is the measuring stick for everything below.'] },
      { h: 'Sort last month into three groups', p: ['Needs: a roof and food up to a basic level, plus bills you cannot skip. Toward: spending you would choose again because it serves your list. Against: spending you would not choose again if you saw it fresh.', 'Take a made-up month with $3,200 spent. $2,000 is needs, $700 is toward, $500 is against.'] },
      { h: 'A simple share you can check', p: ['Leave needs out, since they are not a choice. Then divide toward by toward plus against. Here that is $700 divided by $1,200, or about 58%.', 'The number is not a grade. It shows how much of the money you actually steer is going where you said you wanted it.'] },
      { h: 'Look for the few big items, not the many small ones', p: ['In most months the gap sits in a handful of recurring costs, such as a subscription you forgot, a car you drive little, or a plan you have outgrown. Small daily spending is rarely where the pull is.', 'Some of those costs are tied to obligations and take months to change. Others end on their own or are yours to cancel today. Sorting them by how hard they are to change keeps the exercise realistic.'] },
      { h: 'Your call', p: ['You are the judge of what is aligned. A cost that looks wasteful to one person is the point of life for another. This is education, not advice.'] },
    ],
    cta: { text: 'Try it on your own life. Your answers stay on your device.', href: '/start', label: 'See where my money is going' },
  },
  {
    slug: 'how-to-tell-if-a-recurring-cost-is-still-worth-it',
    title: 'How to tell if a recurring cost is still worth it',
    description: 'A five-question check for any subscription, membership or monthly cost: what it costs per year, how often you use it, and whether you would choose it again.',
    intro: 'Recurring costs are easy to start and easy to forget. Here is a short check that works for a gym, a streaming service, a software tool or a club.',
    sections: [
      { h: 'Turn the monthly price into a yearly one', p: ['A $45 monthly cost is $540 a year. Seeing the yearly figure makes it easier to weigh against a trip or a month of breathing room.'] },
      { h: 'Count how often you actually use it', p: ['Look at the last three months. If you used a $45 membership four times in total, each visit cost about $34 (three months at $45 is $135, divided by 4). That is a fact about the past, not a verdict.'] },
      { h: 'Ask the fresh-eyes question', p: ['If this cost did not exist today and someone offered it to you at this price, would you sign up? Yes, no and not sure are all fine answers.'] },
      { h: 'Check how hard it is to end', p: ['Some costs end with one click. Others have a contract, a fee or a notice period. Knowing that tells you whether to act this week or plan for later.'] },
      { h: 'Say what it would buy instead', p: ['Name something you already value that the same $540 a year would cover, using your own prices. The comparison is yours, not ours.'] },
      { h: 'Your call', p: ['Keeping a cost you would choose again is a good result. The aim is to choose, not to cut. This is education, not advice.'] },
    ],
    cta: { text: 'Go through your own costs one at a time. Everything stays on your device.', href: '/start', label: 'Check my costs' },
  },
];

export const bySlug = (s: string) => GUIDES.find((g) => g.slug === s);
