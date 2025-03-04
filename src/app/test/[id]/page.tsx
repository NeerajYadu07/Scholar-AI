import { Title2 } from '@/components/atoms/typography'
import { DisplayDate } from '@/components/molecules/DisplayDate'
import { Ticker } from '@/components/molecules/Ticker'
import { Test } from '@/components/template/Test'
import { trpcServer } from '@/trpc/client/server'

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = +params.id

  if (!courseId) {
    return <div>No course id provided.</div>
  }

  const data = await trpcServer.tests.createTest.mutate({ id: courseId })

  if (!data?.id) {
    return <div>Something went wrong. Please try again.</div>
  }

  return (
    <div className="mt-12 max-w-2xl mx-auto border bg-gray-100 p-4 rounded-lg dark:bg-slate-500">
      <div className="flex justify-center mb-6 items-start gap-2">
        <div>
          <div>
            <Title2>Test: {data.Course.title}</Title2>
            <DisplayDate dateString={data.createdAt} />
          </div>
          <div className="mb-12 text-sm text-gray-600 mt-4">
            {data.TestQuestions.length} x 20 marks
          </div>
        </div>
        <Ticker startDateTime={data.createdAt} />
      </div>
      <Test questions={data.TestQuestions || []} testId={data.id} />
    </div>
  )
}
