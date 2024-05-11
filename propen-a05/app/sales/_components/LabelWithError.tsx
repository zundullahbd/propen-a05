'use client'

import * as React from 'react'

import { FormState } from '../_actions/action'
import { Label } from '@/app/components/ui/label'

interface LabelWithError {
	htmlFor: string
	children: string
	error?: string
}

export const LabelWithError = ({ children, htmlFor, error }: LabelWithError) => (
	<div className='flex justify-between items-center mb-2'>
		<Label htmlFor={htmlFor}>{children}</Label>
		{error && <span className='text-red-500 text-xs'>{error}</span>}
	</div>
)
