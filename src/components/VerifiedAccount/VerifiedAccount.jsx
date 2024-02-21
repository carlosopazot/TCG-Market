import { Row, Col, Typography } from "antd"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const { Title } = Typography

const VerifiedAccount = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      {user.emailVerified === true ? (
        <Row>
          <Col>
          <Title>Verificado</Title>
          </Col>
        </Row>
      ):(
        <Row>
          <Col>
            <Title>No verificado</Title>
          </Col>
        </Row>
      )}
    </>
  )
}

export default VerifiedAccount