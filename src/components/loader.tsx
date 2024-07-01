import React, { useEffect } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from './ui/card'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Progress } from "@/components/ui/progress"


const Loader = () => {
    const [progress, setProgress] = React.useState(13)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-80">
                <Card>
                    <CardHeader>
                        <div className="flex justify-center w-full">
                            <GitHubLogoIcon width="50" height="50" />
                        </div>
                    </CardHeader>
                    <CardContent className='justify-center items-center'>
                        <Progress value={progress} className="w-[100%]" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Loader