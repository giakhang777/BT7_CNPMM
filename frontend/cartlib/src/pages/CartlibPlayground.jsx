import React from "react";
import { Row, Col, Card, Typography, Divider } from "antd";
import {
  CartProvider,
  AddToCartButton,
  CartDrawer,
} from "@khang0762/cartlib";
import "@khang0762/cartlib/dist/cartlib.css"; // nếu lib có CSS, import để test

const { Title, Text } = Typography;

// Đổi tên/ảnh/giá để test.
// Có tên rất dài để thử xuống dòng.
const demoProducts = [
  {
    id: 101,
    name: "Samsung Galaxy S25 FE 5G 8GB/256GB bản quốc tế - hỗ trợ AI, màn hình 120Hz, sạc nhanh 45W siêu bền",
    price: 18490000,
    image:
      "https://picsum.photos/seed/s25fe/300/200",
  },
  {
    id: 102,
    name: "iPhone 17 256GB",
    price: 22740900,
    image:
      "https://picsum.photos/seed/iphone17/300/200",
  },
  {
    id: 103,
    name: "Samsung Galaxy A17 5G 8GB/128GB (New 2025) - góc chụp rộng",
    price: 6190000,
    image:
      "https://picsum.photos/seed/a17/300/200",
  },
  {
    id: 104,
    name: "iPhone Air 256GB",
    price: 31990000,
    image:
      "https://picsum.photos/seed/iphoneair/300/200",
  },
];

const VND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(n || 0)
  );

/**
 * Trang sandbox để kiểm thử cartlib mà không đụng gì tới app chính.
 * - Có nút CartDrawer ở góc phải của trang sandbox
 * - Mỗi thẻ có AddToCartButton
 * - CartProvider riêng (persist=false) để không làm bẩn localStorage app đang chạy
 */
export default function CartlibPlayground() {
  return (
    <CartProvider persist={false}>
      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
          <Title level={3} style={{ margin: 0 }}>
            Cartlib Playground
          </Title>
          <CartDrawer />
        </div>

        <Divider />

        <Row gutter={[16, 16]}>
          {demoProducts.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: "100%", height: 160, objectFit: "cover" }}
                  />
                }
                bodyStyle={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {/* Tên dài -> xuống dòng bình thường */}
                <Text strong style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                  {p.name}
                </Text>
                <Text>{VND(p.price)}</Text>

                <AddToCartButton
                  product={{
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                  }}
                >
                  Thêm vào giỏ
                </AddToCartButton>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />
        <Text type="secondary">
          *Drawer của cartlib đã được chỉnh: nền trắng, có checkbox chọn từng sản phẩm, cột số lượng cố định để
          các input thẳng hàng, và tên sản phẩm dài sẽ tự xuống dòng.
        </Text>
      </div>
    </CartProvider>
  );
}
