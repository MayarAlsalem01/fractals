import { OrderedList, OrderedListItem, OrderedListTitle, OrderListContent, SubOrderedList, SubOrderedListItem } from '@/features/privacy-terms/components/OrderedList'
import { Sub } from '@radix-ui/react-dropdown-menu'
import React from 'react'

export default function page() {
    return (
        <section className=" py-8">
            <h1 className="text-transparent bg-clip-text bg-linear-to-r from-brand-secondary md:to-50% to-brand-primary font-bold text-4xl md:text-5xl lg:text-6xl py-2">
                Cookies settings
            </h1>
            <OrderedList>
                <OrderedListItem>
                    <OrderedListTitle>
                        What Are Cookies?
                    </OrderedListTitle>
                    <OrderListContent>

                        Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to the site owners.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Types We Use:
                    </OrderedListTitle>
                    <SubOrderedList>
                        <SubOrderedListItem>
                            Essential Cookies: These are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the site.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            Analytics Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </SubOrderedListItem>
                        <SubOrderedListItem>
                            Track engagement for improvements.
                        </SubOrderedListItem>
                    </SubOrderedList>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Consent & Control
                    </OrderedListTitle>
                    <OrderListContent>
                        By using our website, you consent to the use of cookies as described in this policy. You can manage your cookie preferences through your browser settings. Most browsers allow you to refuse or delete cookies, but please note that disabling cookies may affect the functionality of our website.
                    </OrderListContent>
                </OrderedListItem>
                <OrderedListItem>
                    <OrderedListTitle>
                        Third-Party Cookies
                    </OrderedListTitle>
                    <OrderListContent>
                        We may use third-party services that set cookies on our behalf, such as analytics providers. These cookies are subject to the respective privacy policies of these third parties.
                    </OrderListContent>
                </OrderedListItem>
            </OrderedList>
        </section>
    )
}
