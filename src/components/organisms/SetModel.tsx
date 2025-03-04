'use client'
import { trpcClient } from '@/trpc/client/client'
import { Label } from '../atoms/label'
import { HtmlSelect } from '../atoms/select'
import { $Enums } from '@prisma/client'
import { getModelName } from '@/util'
import { useToast } from '../molecules/Toaster/use-toast'
import { Loading } from '../molecules/Loading'

export const SetModel = () => {
  const { toast } = useToast()

  const utils = trpcClient.useUtils()
  const { data } = trpcClient.aiModel.currentModel.useQuery()

  const { mutateAsync: updateAiModel, isLoading } =
    trpcClient.aiModel.updateCurrentModel.useMutation({
      onSuccess(data, variables, context) {
        utils.aiModel.currentModel.invalidate()
        toast({ title: `Model updated to ${data.currentModel}` })
      },
    })

  if (isLoading) {
    return <Loading />
  }

  return (
    <Label title="Active Model">
      <HtmlSelect
        value={data}
        onChange={async (e) => {
          const selectedModel = e.target.value as $Enums.AIModel
          await updateAiModel({ model: selectedModel })
        }}
        placeholder="Model"
      >
        {Object.values($Enums.AIModel).map((type) => (
          <option key={type} value={type}>
            {getModelName(type)}
          </option>
        ))}
      </HtmlSelect>
    </Label>
  )
}
