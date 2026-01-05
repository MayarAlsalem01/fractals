import { OrderedList, OrderedListItem, OrderedListTitle, OrderListContent, SubOrderedList, SubOrderedListItem, SubOrderedListTitle } from "@/features/privacy-terms/components/OrderedList";

export default function page() {
    return (
        <section className=" py-8">
            <h1 className="text-transparent bg-clip-text bg-linear-to-r from-brand-secondary md:to-50% to-brand-primary font-bold text-4xl md:text-5xl lg:text-6xl">
                Our Privacy policy
            </h1>

            <OrderedList >
                <OrderedListItem>
                    <OrderedListTitle >
                        Client Information:

                    </OrderedListTitle>
                    <OrderListContent >
                        Fractals Group we respects your privacy and is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your information when you use our website, products, or services.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle >
                        Information We Collect:

                    </OrderedListTitle>
                    <SubOrderedList className="mt-4 text-xl flex flex-col gap-2 list-disc marker:text-base marker:text-white">
                        <SubOrderedListTitle >
                            We may collect:
                        </SubOrderedListTitle>
                        <SubOrderedListItem>
                            Contact info (name, email, phone) via contact forms.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            Usage data (pages visited, time on site).
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            Technical data (IP, device type, browser).
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            Third-party analytics data.
                        </SubOrderedListItem>
                    </SubOrderedList>
                </OrderedListItem>
                <OrderedListItem>

                    <OrderedListTitle >
                        How We Use Your Data?
                    </OrderedListTitle>
                    <SubOrderedList>
                        <SubOrderedListItem>
                            To respond to inquiries and provide services.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            To improve our website and services.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            To send updates if consent is given.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            To personalize your experience.
                        </SubOrderedListItem>
                    </SubOrderedList>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>

                        Cookies & Tracking
                    </OrderedListTitle>
                    <OrderListContent>
                        We use cookies and similar tech to enhance your experience.
                        You’ll be asked for consent to non-essential cookies.
                        You can change your preferences at any time.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Data Sharing
                    </OrderedListTitle>
                    <OrderListContent>
                        We do not sell your personal data. We may share data with trusted service
                        providers (hosting, analytics) under strict controls.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Security
                    </OrderedListTitle>
                    <OrderListContent>
                        We implement measures to protect your data but cannot guarantee absolute security.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        International Data Transfers
                    </OrderedListTitle>
                    <OrderListContent>
                        You consent to transfers of data to servers outside your location with appropriate safeguards.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Your Rights
                    </OrderedListTitle>
                    <OrderListContent>
                        You can access, update, delete, or restrict data we hold about you.
                    </OrderListContent>
                </OrderedListItem>
            </OrderedList>
        </section>
    )
}

