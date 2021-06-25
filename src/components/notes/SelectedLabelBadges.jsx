const SelectedLabelBadges = ({ selectedLabelsList }) => {
	return (
		<div>
			{selectedLabelsList.length > 0 && (
				<div className=''>
					{selectedLabelsList.map((item) => (
						<span className='badge' key={item}>
							{item}
						</span>
					))}
				</div>
			)}
		</div>
	)
}

export default SelectedLabelBadges
