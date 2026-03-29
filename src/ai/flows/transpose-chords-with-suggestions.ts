'use server';
/**
 * @fileOverview An AI agent that transposes chord progressions and suggests optimal voicings.
 *
 * - transposeChordsWithSuggestions - A function that handles the chord transposition and suggestion process.
 * - TransposeChordsWithSuggestionsInput - The input type for the transposeChordsWithSuggestions function.
 * - TransposeChordsWithSuggestionsOutput - The return type for the transposeChordsWithSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TransposeChordsWithSuggestionsInputSchema = z.object({
  chordProgression: z
    .string()
    .describe(
      'The original chord progression to be transposed (e.g., "Am G C F").'
    ),
  targetKey: z
    .string()
    .describe('The target musical key for the transposition (e.g., "D Major", "C minor").'),
});
export type TransposeChordsWithSuggestionsInput = z.infer<
  typeof TransposeChordsWithSuggestionsInputSchema
>;

const TransposeChordsWithSuggestionsOutputSchema = z.object({
  originalKey: z
    .string()
    .describe('The inferred original key of the provided chord progression.'),
  transposedProgression: z
    .string()
    .describe('The chord progression transposed to the target key.'),
  suggestions: z
    .string()
    .describe(
      'Suggestions for optimal or simpler chord voicings in the new key, explained in a clear, musical way.'
    ),
});
export type TransposeChordsWithSuggestionsOutput = z.infer<
  typeof TransposeChordsWithSuggestionsOutputSchema
>;

export async function transposeChordsWithSuggestions(
  input: TransposeChordsWithSuggestionsInput
): Promise<TransposeChordsWithSuggestionsOutput> {
  return transposeChordsWithSuggestionsFlow(input);
}

const transposeChordsWithSuggestionsPrompt = ai.definePrompt({
  name: 'transposeChordsWithSuggestionsPrompt',
  input: { schema: TransposeChordsWithSuggestionsInputSchema },
  output: { schema: TransposeChordsWithSuggestionsOutputSchema },
  prompt: `You are an expert music theorist and arranger. Your task is to transpose a given chord progression to a new musical key and provide practical suggestions for chord voicings.

First, infer the original key of the provided chord progression. Then, accurately transpose the entire progression to the specified target key.
Finally, provide suggestions for optimal or simpler chord voicings in the new key. Explain your suggestions in a clear, musical way, considering common practices and ease of playability.

Original Chord Progression: {{{chordProgression}}}
Target Key: {{{targetKey}}}`,
});

const transposeChordsWithSuggestionsFlow = ai.defineFlow(
  {
    name: 'transposeChordsWithSuggestionsFlow',
    inputSchema: TransposeChordsWithSuggestionsInputSchema,
    outputSchema: TransposeChordsWithSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await transposeChordsWithSuggestionsPrompt(input);
    return output!;
  }
);
