import { PinInput, PinInputField } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import type { ActionFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

export const meta: MetaFunction = () => {
    return [{ title: 'Re-Wordle' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const wordToGuess = faker.word.noun(5);

// TODO: announce when user loses game, possibly clear inputs, allow user to restart, etc

const defaultNumberOfGuesses = 6;
// An array of guesses the user has submitted
const attemptedGuesses: string[][] = [];

export async function loader() {
    const remainingAttempts = defaultNumberOfGuesses - attemptedGuesses.length;

    return {
        guesses: attemptedGuesses,
        remainingAttempts
    };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = Object.fromEntries(await request.formData());

    const attemptedGuess: string[] = [];

    // loop over the inputs we've received
    for (const index in formData) {
        // Coerce the index (used as name) into a number
        const indexOfGuess = parseInt(index, 10);

        // Ensure that we are using the bounds given to the names & that we didn't exceed the length
        if (indexOfGuess < 5) {
            const charUserEntered = formData[index];

            invariant(typeof charUserEntered === 'string', 'Expected a string input');

            attemptedGuess[indexOfGuess] = charUserEntered;
        }
    }

    // Add the guess to the list of entries
    attemptedGuesses.push(attemptedGuess);

    return null;
}

export default function Index() {
    const { guesses, remainingAttempts } = useLoaderData<typeof loader>();

    // TODO: remove from here
    console.log({ guesses, wordToGuess });

    return (
        <div className="font-sans p-4">
            {guesses.map((guess, i) => {
                const word = guess.join('');

                return (
                    <div key={i} className="flex flex-row">
                        <PinInput type="alphanumeric" defaultValue={word}>
                            {guess.map((character, charIdx) => {
                                // If the character is in the right place highlight green
                                if (wordToGuess[charIdx] === character) {
                                    return <PinInputField key={`${character}-${charIdx}`} borderColor="green" />;
                                    // If the character is in the word, highlight yellow
                                } else if (wordToGuess.includes(character)) {
                                    return <PinInputField key={`${character}-${charIdx}`} borderColor="yellow" />;
                                } else {
                                    return <PinInputField key={`${character}-${charIdx}`} />;
                                }
                            })}
                        </PinInput>
                    </div>
                );
            })}

            {remainingAttempts !== 0 ? (
                <div className="flex flex-row" key={remainingAttempts}>
                    <Form method="post">
                        <PinInput type="alphanumeric" placeholder="">
                            {Array.from({ length: 5 }, (_, j) => (
                                <PinInputField key={j} name={j.toString()} required type="text" pattern="[a-zA-Z]*" />
                            ))}
                        </PinInput>
                        <input type="submit" />
                    </Form>
                </div>
            ) : null}

            {Array.from({ length: remainingAttempts - 1 }, (_, index) => (
                <div key={index} className="flex flex-row">
                    <PinInput type="alphanumeric" placeholder="">
                        {Array.from({ length: 5 }, (_, j) => (
                            <PinInputField key={j} />
                        ))}
                    </PinInput>
                </div>
            ))}
        </div>
    );
}
