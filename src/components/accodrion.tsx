import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function AccordionSection() {
    return (
        <Accordion type="single" collapsible className="w-full bg-white dark:bg-gray-950 rounded-lg shadow-lg">
            <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Is it accessible?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-400">
                    Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Is it styled?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-400">
                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    Is it animated?
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 dark:text-gray-400">
                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}