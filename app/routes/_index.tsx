import React from 'react';
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Form } from '@remix-run/node';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return [{ title: 'Re-Wordle' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader() {
    return {
        attempts: [[], [], [], [], [], []]
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());

    console.log({ formData });
    return {
        attempts: [[], [], [], [], [], []]
    };
}

const colorMap = {
    0: 'black',
    1: 'green',
    2: 'yellow'
};

export default function Index() {
    const attempts = [[], [], [], [], [], []]

    return (
        <div className="font-sans p-4">
            <Form action="/attempt" method="post">
                {attempts.map((attempt, i) => (
                    <div key={i} className="flex flex-row">
                        {attempt[index - 1].length
                            ? <PinInput type="alphanumeric">
                                    {Array.from({ length: 5 }, (_, j) => (
                                        <PinInputField key={j} />
                                    ))}
                                </PinInput>
                            : <div>
                                    {Array.from({ length: 5 }, (_, j) => (
                                        <div key={j}>empty row</div>
                                    ))}
                                </div>
                        }
                    </div>
                ))}
            </Form>
        </div>
    );
}