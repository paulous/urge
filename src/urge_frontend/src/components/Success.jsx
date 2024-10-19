import React from 'react'

export const Success = () => {
	return (
		<div className='absolute flex justify-center content-center origin-center '>
			<div className='absolute flex justify-center content-center  origin-center'>
				<div className='absolute animate-flyoutup [--fly-up-del:0.33s] [--fly-up-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutdown [--fly-down-del:0.33s] [--fly-down-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutleft [--fly-left-del:0.33s] [--fly-left-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutright [--fly-right-del:0.33s] [--fly-right-rep:1]'>🪙</div>
			</div>
			<div className='absolute flex justify-center content-center origin-center rotate-45'>
				<div className='absolute animate-flyoutup [--fly-up-del:0.33s] [--fly-up-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutdown [--fly-down-del:0.33s] [--fly-down-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutleft [--fly-left-del:0.33s] [--fly-left-rep:1]'>🪙</div>
				<div className='absolute animate-flyoutright [--fly-right-del:0.33s] [--fly-right-rep:1]'>🪙</div>
			</div>
		</div>
	)
}
