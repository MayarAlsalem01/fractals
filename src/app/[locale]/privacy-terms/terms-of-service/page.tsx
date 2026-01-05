import { OrderedList, OrderedListItem, OrderedListTitle, OrderListContent, SubOrderedList, SubOrderedListItem } from '@/features/privacy-terms/components/OrderedList'

export default function page() {
    return (
        <section className=" py-8">
            <h1 className="text-transparent bg-clip-text bg-linear-to-r from-brand-secondary md:to-50% to-brand-primary font-bold text-4xl md:text-5xl lg:text-6xl py-2">
                Terms of service
            </h1>
            <OrderedList>
                <OrderedListItem>
                    <OrderedListTitle>
                        Acceptance of Terms
                    </OrderedListTitle>
                    <OrderListContent>
                        By accessing or using Fractals Group services and using our website, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Use of Services
                    </OrderedListTitle>
                    <OrderListContent>
                        You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services in any way that could damage, disable, overburden, or impair our servers or networks.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Client Obligations
                    </OrderedListTitle>
                    <OrderListContent>
                        Clients must provide required info, approvals, and materials on schedule.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Payment & Fees
                    </OrderedListTitle>
                    <OrderListContent>
                        All fees for our services are as outlined in the applicable agreements. Payments are due as specified, and late payments may incur additional charges.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Ownership & Intellectual Property
                    </OrderedListTitle>
                    <OrderListContent>
                        Fractals retains ownership of work until full payment is received. Upon payment, rights transfer as agreed.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Confidentiality
                    </OrderedListTitle>
                    <OrderListContent>
                        Both parties agree to keep confidential information private and not disclose it without consent.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Limitation of Liability
                    </OrderedListTitle>
                    <OrderListContent>
                        Fractals’ liability is limited to direct damages up to the amount paid by the client for the services.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Governing Law
                    </OrderedListTitle>
                    <OrderListContent>
                        These Terms are governed by the laws of the applicable jurisdiction.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Changes to Terms
                    </OrderedListTitle>
                    <OrderListContent>
                        We may update these Terms periodically. Continued use of our services constitutes acceptance of the revised terms.
                    </OrderListContent>
                </OrderedListItem>
            </OrderedList>
        </section>
    )
}
