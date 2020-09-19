import {assert, fail, assertEquals, assertThrows, assertThrowsAsync} from "https://deno.land/std/testing/asserts.ts"

const assertions = {
	/** Assert that `actual` is deeply equal with `expected`/ */
	deepEqual(actual: unknown, expected: unknown) {
		assertEquals(actual, expected)
	},

	/** Fail the test. */
	fail(message = "Test failed") {
		fail(message)
	},

	/** Assert that `actual` is strictly false. */
	false(actual: unknown) {
		assert(actual === false)
	},

	/** Assert that `actual` is falsy. */
	falsy(actual: unknown) {
		assert(!actual)
	},

	/** Assert that `actual` is the same as `expected`. */
	is(actual: unknown, expected: unknown) {
		assert(actual === expected)
	},

	/** Assert that `actual` is not the same as `expected`. */
	not(actual: unknown, expected: unknown) {
		assert(actual !== expected)
	},

	/** Assert that `actual` is not  deeply equal with `expected`/ */
	notDeepEqual(actual: unknown, expected: unknown) {
		assertEquals(actual, expected)
	},

	/** Assert that `string` does not match the regular expression. */
	notRegex(string: string, regex: RegExp) {
		assert(!regex.test(string))
	},

	/** Assert that the function does not throw. */
	notThrows(testFunction: () => void) {
		try {
			testFunction()
		} catch (error) {
			fail(`Error thrown: ${error}`)
		}
	},

	/** Assert that the asynchronous function does not throw. */
	async notThrowsAsync(testFunction: () => Promise<void>) {
		try {
			await testFunction()
		} catch (error) {
			fail(`Error thrown: ${error}`)
		}
	},

	/** Assert that the function throws an error and returns it. */
	throws(testFunction: () => void) {
		return assertThrows(testFunction)
	},

	/** Assert that `string` matches the regular expression. */
	regex(string: string, regex: RegExp) {
		assert(regex.test(string))
	},

	/** Assert that the asynchronous function throws an error and returns it. */
	async throwsAsync(testFunction: () => Promise<void>) {
		return assertThrowsAsync(testFunction)
	},

	/** Assert that `actual` is strictly true. */
	true(actual: unknown) {
		assert(actual === true)
	},

	/** Assert that `actual` is truthy. */
	truthy(actual: unknown) {
		assert(Boolean(actual))
	}
}

const test = (title: string, implementation: (t: typeof assertions) => void | Promise<void>) => {
	Deno.test(title, async () => {
		await implementation(assertions)
	})
}

export default test
