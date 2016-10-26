-- =============================================

-- =============================================
CREATE PROCEDURE [dbo].[ItemDeleteData]
	@ItemId INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


			DELETE  FROM [dbo].[Item] WHERE ItemId=@ItemId
		
END
